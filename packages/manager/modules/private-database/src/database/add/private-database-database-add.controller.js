import _ from 'lodash';

export default class PrivateDatabaseAddBddCtrl {
  /* @ngInject */

  constructor(
    $scope,
    $q,
    $stateParams,
    $translate,
    Alerter,
    PrivateDatabase,
    WhitelistService,
    WucValidator,
  ) {
    this.$scope = $scope;
    this.$q = $q;
    this.$stateParams = $stateParams;
    this.$translate = $translate;
    this.Alerter = Alerter;
    this.PrivateDatabase = PrivateDatabase;
    this.whitelistService = WhitelistService;
    this.validator = WucValidator;
  }

  $onInit() {
    this.productId = this.$stateParams.serviceName;

    if (this.$scope.isDBaaS()) {
      this.checkAuthorizedIp().then((hasAuthorizedIp) => {
        // if there are no ip configured,
        // we check the box to suggest the user to add an ip
        this.model.addIp = !hasAuthorizedIp;

        this.hasAuthorizedIp = hasAuthorizedIp;
      });
    }

    this.model = {
      addUser: false,
      addIp: false,
      database: {
        value: '',
        condition: {
          length: {
            min: 1,
            max: 50,
          },
          reg: /^([\d\w-]){1,50}$/,
        },
      },
      user: {
        login: {
          value: '',
          condition: {
            length: {
              min: 1,
              max: 16,
            },
            reg: /^([\d\w.-]){1,16}$/,
          },
        },
        grant: {
          value: '',
        },
        password: {
          value: '',
          confirm: '',
          condition: {
            length: {
              min: 8,
              max: 31,
            },
          },
        },
      },
      ip: {
        value: '',
      },
    };

    this.PrivateDatabase.getModels().then((models) => {
      this.grantEnum = models['hosting.PrivateDatabase.grant.GrantEnum'].enum;
    });

    this.$scope.addBdd = () => this.addBdd();
    this.$scope.isBddValid = () => this.isBddValid();
  }

  checkAuthorizedIp() {
    return this.whitelistService
      .getWhitelistIds(this.productId)
      .then(result => !_.isEmpty(result));
  }

  addBdd() {
    this.$scope.resetAction();

    this.$q
      .when(this.model.addUser)
      .then((addUser) => {
        if (addUser) {
          return this.PrivateDatabase.addBddWizard(this.productId, {
            databaseName: this.model.database.value,
            grant: this.model.user.grant.value,
            password: this.model.user.password.value,
            userName: this.model.user.login.value,
          });
        }
        return this.PrivateDatabase.addBdd(
          this.productId,
          this.model.database.value,
        );
      })
      .then(() => {
        if (this.model.addIp) {
          return this.whitelistService.createWhitelist(this.productId, {
            ip: this.model.ip.value,
            name: this.$translate.instant('privateDatabase_add_authorized_ip_description'),
            service: true,
            sftp: false,
          });
        }
        return null;
      })
      .then(
        () => this.Alerter.success(
          this.$translate.instant('privateDatabase_add_bdd_success'),
          this.$scope.alerts.main,
        ),
        () => this.Alerter.error(
          this.$translate.instant('privateDatabase_add_bdd_fail'),
          this.$scope.alerts.main,
        ),
      );
  }

  isBddValid() {
    if (!this.model.addUser) {
      return this.isBddNameValid();
    }
    return (
      this.isBddNameValid()
      && this.isLoginValid()
      && this.isPasswordValid()
      && !!this.model.user.grant.value
    );
  }

  isBddNameValid() {
    return (
      this.model.database.value
      && this.model.database.condition.reg.test(this.model.database.value)
    );
  }

  isLoginValid() {
    return (
      this.model.user.login.value
      && this.model.user.login.condition.reg.test(this.model.user.login.value)
    );
  }

  isPasswordValid() {
    return this.checkPassword() && this.checkPasswordConfirm();
  }

  static validatesPassword(password, customConditions = undefined) {
    const min = _.get(customConditions, 'min', 8);
    const max = _.get(customConditions, 'max', 30);
    return !!(
      password
      && password.length >= min
      && password.length <= max
      && password.match(/.*[0-9].*/)
      && password.match(/.*[a-z].*/)
      && password.match(/.*[A-Z].*/)
      && password.match(/^[a-zA-Z0-9]+$/)
    );
  }

  checkPassword() {
    return (
      this.model.user.password.value
      && PrivateDatabaseAddBddCtrl.validatesPassword(this.model.user.password.value)
    );
  }

  checkPasswordConfirm() {
    return (
      this.model.user.password.confirm
      && PrivateDatabaseAddBddCtrl.validatesPassword(this.model.user.password.confirm)
      && this.model.user.password.confirm === this.model.user.password.value
    );
  }

  getGrantLabel(grant) {
    return grant
      ? this.$translate.instant(`privateDatabase_add_bdd_new_user_grant_${grant}`)
      : '';
  }

  isIpValid(ip) {
    return (
      this.validator.isValidIpv4Block(ip) || this.validator.isValidIpv4(ip)
    );
  }
}