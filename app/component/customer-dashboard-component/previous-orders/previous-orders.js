'use strict';

require('./_previous-orders.scss');

module.exports = {
  template: require('./previous-orders.html'),
  controller: ['$q','$log', 'customerService', CustomerPreviousOrdersController],
  controllerAs: 'customerPreviousOrdersCtrl'
};

function CustomerPreviousOrdersController($q, $log, customerService) {
  $log.debug('PreviousOrdersController');

  this.arrayOfOrders = customerService.currentCustomer.currentOrders;
  this.noOrders = false;

  if(this.arrayOfOrders.length === 0) {
    this.noOrders = true;
  }
}
