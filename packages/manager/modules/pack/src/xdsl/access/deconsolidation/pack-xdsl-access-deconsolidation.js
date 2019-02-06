angular.module('managerApp').config(($stateProvider) => {
  $stateProvider.state('pack.xdsl.access-deconsolidation', {
    url: '/deconsolidation',
    views: {
      'accessView@pack.xdsl': {
        controller: 'XdslDeconsolidationCtrl',
        controllerAs: 'DeconCtrl',
        templateUrl: 'app/telecom/pack/xdsl/access/deconsolidation/pack-xdsl-access-deconsolidation.html',
      },
    },
    translations: ['.', './contract'],
  });
});