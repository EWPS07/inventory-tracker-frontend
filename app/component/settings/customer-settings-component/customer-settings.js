'use strict';
require('./_customer-settings.scss');

module.exports = {
  template: require('./customers-settings.html'),
  controller: ['$log', 'customerService', CustomerSettingsController],
  controllerAs: 'customerSettingsCtrl'
};

function CustomerSettingsController($log, customerService) {
  $log.debug('CustomerSettingsController');

  this.currentCustomer = customerService.currentCustomer;

  this.updateCustomerInfo = function(user) {
    $log.log('customerSettingsCtrl.updateCustomerInfo()');

    customerService.updateCustomer(user, this.currentCustomer._id);
    return;
  };

  this.deleteCustomer = function(customerID) {
    $log.log('customerSettingsCtrl.deleteCustomer()');

    customerService.removeCustomer(this.currentCustomer, customerID);
  };

}
