'use strict';

require('./_customer-dashboard.scss');

module.exports = ['$log', CustomerDashboardController];

function CustomerDashboardController($log){
  $log.debug('CustomerDashboardController');
}
