'use strict';
require('./_customer-settings.scss');

module.exports = {
  template: require('./customer-settings.html'),
  controller: ['$log', 'customerService', CustomerSettingsController],
  controllerAs: 'customerSettingsCtrl'
};

function CustomerSettingsController($log, customerService) {
  $log.debug('CustomerSettingsController');

  this.currentCustomer = customerService.currentCustomer;

  this.updateCustomerInfo = function(user) {
    customerService.updateCustomer(user, this.currentCustomer._id);
    $log.log(this.currentCustomer);
    return;
  };

}
