import angular from 'angular';
import managerCore from '@ovh-ux/manager-core';
import ovhUtilsAngular from '@ovh-ux/ovh-utils-angular';
import webUniverseComponents from '@ovh-ux/web-universe-components';
import 'angularjs-scroll-glue';
import 'ovh-angular-tail-logs';

import privateDatabaseUser from './user';
import privateDatabaseDatabase from './database';

import controller from './private-database.controller';
import configurationController from './configuration/private-database-configuration.controller';
import logsController from './logs/private-database-logs.controller';
import metricsController from './metrics/private-database-metrics.controller';
import tabsController from './private-database-tabs.controller';
import stateController from './state/private-database-state.controller';
import taskController from './task/private-database-task.controller';

import template from './private-database.html';
import configurationTemplate from './configuration/private-database-configuration.html';
import logsTemplate from './logs/private-database-logs.html';
import metricsTemplate from './metrics/private-database-metrics.html';
import stateTemplate from './state/private-database-state.html';
import taskTemplate from './task/private-database-task.html';

import privateDatabaseService from './private-database.service';
import privateDatabaseLogsService from './logs/private-database-logs.service';
import privateDatabaseOomService from './oom/private-database-oom.service';
import whitelistService from './whitelist/private-database-whitelist.service';

const moduleName = 'ovhManagerPrivateDatabase';

angular.module(moduleName, [
  managerCore,
  ovhUtilsAngular,
  'ovh-angular-tail-logs',
  privateDatabaseUser,
  privateDatabaseDatabase,
  webUniverseComponents,
])
  .run(($templateCache) => {
    $templateCache.put('private-database/configuration/private-database-configuration.html', configurationTemplate);
    $templateCache.put('private-database/logs/private-database-logs.html', logsTemplate);
    $templateCache.put('private-database/metrics/private-database-metrics.html', metricsTemplate);
    $templateCache.put('private-database/state/private-database-state.html', stateTemplate);
    $templateCache.put('private-database/task/private-database-task.html', taskTemplate);
  })
  .service('PrivateDatabase', privateDatabaseService)
  .service('PrivateDatabaseLogsService', privateDatabaseLogsService)
  .service('OomService', privateDatabaseOomService)
  .service('whitelistService', whitelistService)
  .controller('PrivateDatabaseConfigurationsCtrl', configurationController)
  .controller('PrivateDatabaseLogsCtrl', logsController)
  .controller('PrivateDatabaseMetricsCtrl', metricsController)
  .controller('PrivateDatabaseTabsCtrl', tabsController)
  .controller('PrivateDatabaseStateCtrl', stateController)
  .controller('PrivateDatabaseTasksCtrl', taskController)
  .config(($stateProvider) => {
    $stateProvider.state('private-database', {
      url: '/configuration/private_database/:serviceName?tab',
      template,
      controller,
      controllerAs: '$ctrl',
      reloadOnSearch: false,
      resolve: {
        navigationInformations: [
          'Navigator',
          '$rootScope',
          (Navigator, $rootScope) => {
            $rootScope.currentSectionInformation = 'private_database'; // eslint-disable-line no-param-reassign
            return Navigator.setNavigationInformation({
              leftMenuVisible: true,
              configurationSelected: true,
            });
          },
        ],
      },
      translations: ['.'],
    });

  /*
  $stateProvider.state('app.private-database-order', {
    url: '/configuration/private_database',
    templateUrl: 'private-database/order/private-database-order.html',
    controller: 'PrivateDatabaseOrderCtrl',
    resolve: {
      navigationInformations: [
        'Navigator',
        '$rootScope',
        (Navigator, $rootScope) => {
          $rootScope.currentSectionInformation =
            'private_database'; // eslint-disable-line no-param-reassign
          return Navigator.setNavigationInformation({
            leftMenuVisible: true,
            configurationSelected: true,
          });
        },
      ],
    },
    translations: ['../private-database'],
  });

  $stateProvider.state('app.sql-order', {
    url: '/configuration/sql_order?orderType&currentHosting',
    params: {
      currentHosting: { value: null, squash: true },
      orderType: { value: 'private' },
    },
    templateUrl: 'private-database/order/sql-database-order.html',
    controller: 'SqlDatabaseOrderCtrl',
    resolve: {
      navigationInformations: [
        'Navigator',
        '$rootScope',
        (Navigator, $rootScope) => {
          $rootScope.currentSectionInformation =
            'private_database'; // eslint-disable-line no-param-reassign
          return Navigator.setNavigationInformation({
            leftMenuVisible: true,
            configurationSelected: true,
          });
        },
      ],
    },
    translations: ['../private-database'],
  });
  */
  });

export default moduleName;
