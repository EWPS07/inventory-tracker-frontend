'use strict';
require('./_customer-settings.scss');

module.exports = {
  template: require('./customer-settings.html'),
  controller: ['$log', '$location', 'customerService', CustomerSettingsController],
  controllerAs: 'customerSettingsCtrl'
};

function CustomerSettingsController($log, $location, customerService) {
  $log.debug('CustomerSettingsController');

  this.currentCustomer = customerService.currentCustomer;

  this.updateCustomerInfo = function(user) {
    $log.log('customerSettingsCtrl.updateCustomerInfo()');

    customerService.updateCustomer(user, this.currentCustomer._id)
    .then( () => {
      $location.url('/shopping');
    });
  };

  this.deleteCustomer = function(customerID) {
    $log.log('customerSettingsCtrl.deleteCustomer()');

    customerService.removeCustomer(this.currentCustomer, customerID)
    .then( () => {
      $location.url('/create-account');
    });
  };
}
