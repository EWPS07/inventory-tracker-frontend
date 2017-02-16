'use strict';

require('./_settings.scss');

module.exports = ['$log', 'storeService', 'employeeService', 'employeeService', SettingsController];

function SettingsController($log, storeService, employeeService, customerService) {
  $log.debug('SettingsController');

  this.currentStore = storeService.currentStore;
  this.currentEmployee = employeeService.currentEmployee;
  this.currentCustomer = customerService.currentCustomer;
  this.employeeLoggedIn = true;
  this.customerLoggedIn = true;
}
