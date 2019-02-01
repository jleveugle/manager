import { TELEPHONY_LINE_URL } from './constants';

export default class {
  /* @ngInject */
  constructor(
    OvhApiPackXdslVoipLine,
  ) {
    this.OvhApiPackXdslVoipLine = OvhApiPackXdslVoipLine;
  }

  $onInit() {
    this.details = this.pack;
    this.services = [];

    this.loading = true;

    // Get service link to this access from current Pack Xdsl
    return this.OvhApiPackXdslVoipLine
      .Aapi()
      .query({
        packId: this.pack.packName,
      })
      .$promise
      .then((services) => {
        this.services = [...services];
      })
      .finally(() => {
        this.loading = false;
      });
  }

  static generateLineURL(service) {
    return TELEPHONY_LINE_URL
      .replace('{billingAccount}', service.billingAccount)
      .replace('{serviceName}', service.domain);
  }
}
