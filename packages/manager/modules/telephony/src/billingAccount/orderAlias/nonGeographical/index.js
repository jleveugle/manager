

import angular from 'angular';

import routing from './billing-account-orderAlias-nonGeographical.routes';

const moduleName = 'ovhManagerTelephony.billingAccount.orderAlias.nonGeographical';

angular
  .module(moduleName, [])
  .config(routing);

export default moduleName;
