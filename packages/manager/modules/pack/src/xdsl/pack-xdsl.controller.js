/* global setTimeout */
angular.module('managerApp').controller('PackXdslCtrl', function ($q, $transitions, $state, $translate, $stateParams, OvhApiPackXdsl, OvhApiXdsl, OvhApiXdslModem, TucToast, smoothScroll, TucToastError, SidebarMenu) {
  const animTime = 1500;
  const noModemStatus = 404;
  const self = this;

  self.loading = {
    init: false,
  };

  this.content = {
    back: {},
  };

  function getPackXdsl() {
    return OvhApiPackXdsl.Aapi().get({
      packId: $stateParams.packName,
    }).$promise;
  }

  function getXdsl() {
    return OvhApiXdsl.v6().get({
      xdslId: $stateParams.serviceName,
    }).$promise;
  }

  function setAnim(className) {
    setTimeout(() => {
      self.content.back.class = className;
    }, animTime);
  }

  this.backState = function () {
    return $state.href(this.content.back.state);
  };

  function enableModemIfHaveOne() {
    return OvhApiXdslModem.v6().get({ xdslId: $stateParams.serviceName }).$promise.then(
      () => {
        self.disabledModem = false;
      },
      (err) => {
        if (err.status !== noModemStatus) {
          TucToastError(err);
          return $q.reject(err);
        }
        return err;
      },
    );
  }

  this.updateUIForState = function (state) {
    self.currentState = state.name;
    if ($stateParams.packName === 'sdsl') {
      if (state.name === 'pack.xdsl' || state.name === 'pack.xdsl.modem' || state.name === 'pack.xdsl.tasks') {
        setAnim('anim');
        return;
      }
    }

    smoothScroll(document.body);

    switch (state.name) {
      case 'pack.xdsl.modem.wifi':
      case 'pack.xdsl.modem.dmz':
      case 'pack.xdsl.access-notifications':
      case 'pack.xdsl.access-diagnostic':
      case 'pack.xdsl.access-migration':
      case 'pack.xdsl.access-ip':
      case 'pack.xdsl.access-deconsolidation':
      case 'pack.xdsl.access-order':
      case 'pack.xdsl.access-resiliation':
      case 'pack.xdsl.missing-rio':
      case 'pack.xdsl.line-diagnostic':
        setAnim('invert-anim');
        self.content.back.state = '^';
        getXdsl().then((xdsl) => {
          self.content.status = xdsl.status;
        });
        break;
      case 'pack.xdsl.modem':
      case 'pack.xdsl.tasks':
      case 'pack.xdsl':
        setAnim('anim');
        self.content.back.state = 'pack';
        getXdsl().then((xdsl) => {
          self.content.status = xdsl.status;
        });
        break;
      default:
        setAnim('anim');
        self.content.back = {};
        break;
    }
  };

  $transitions.onSuccess({}, (transition) => {
    self.updateUIForState(transition.to());
  });
  self.updateUIForState($state.current);

  /*= =============================
    =            ACTION            =
    ============================== */

  self.accessDescriptionSave = function (newAccessDescr) {
    self.loading.save = true;

    return OvhApiXdsl.v6().put({
      xdslId: $stateParams.serviceName,
    }, {
      description: newAccessDescr,
    }).$promise.then(() => {
      self.access.description = newAccessDescr;

      // rename in sidebar menu
      SidebarMenu.updateItemDisplay({
        title: newAccessDescr || self.access.serviceName,
      }, $stateParams.serviceName, 'telecom-pack-section', $stateParams.packName);
    }, (error) => {
      TucToast.error([$translate.instant('xdsl_rename_error', $stateParams), error.data.message].join(' '));
      return $q.reject(error);
    }).finally(() => {
      self.loading.save = false;
    });
  };

  /* -----  End of ACTION  ------*/

  /*= =====================================
    =            INITIALIZATION            =
    ====================================== */

  function init() {
    self.loading.init = true;

    self.disabledModem = true;
    enableModemIfHaveOne();

    return $q.allSettled([
      getPackXdsl().then((pack) => {
        self.pack = pack;
      }),
      getXdsl().then((access) => {
        self.access = access;
      }),
    ]).finally(() => {
      self.loading.init = false;
    });
  }

  /* -----  End of INITIALIZATION  ------*/

  init();
});
