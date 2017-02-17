'use strict';

require('./_settings.scss');

module.exports = ['$log', 'storeService', 'customerService', SettingsController];

function SettingsController($log, storeService, customerService) {
  $log.debug('SettingsController');

  this.currentStore = storeService.currentStore;
  this.currentCustomer = customerService.currentCustomer;
}
