

import controller from './billing-account-guides.controller';
import template from './billing-account-guides.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('telephony.billingAccount.guides', {
    url: '/guides',
    template,
    controller,
    controllerAs: '$ctrl',
    translations: ['.'],
  });
};
