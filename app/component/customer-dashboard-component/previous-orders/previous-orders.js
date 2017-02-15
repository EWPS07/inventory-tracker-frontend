'use strict';

require('./_previous-orders.scss');

module.exports = {
  template: require('./previous-orders.html'),
  controller: ['$q','$log', 'customerService', CustomerPreviousOrdersController],
  controllerAs: 'customerPreviousOrdersCtrl',
  bindings: {
    customer: '<'
  }
};

function CustomerPreviousOrdersController($q, $log) {
  $log.debug('PreviousOrdersController');

  this.listOfOrders = this.customerService.currentCustomer.currentOrder.reverse();

  if(this.listOfOrders.length === 0) {
    return $q.reject(new Error('No Orders Found.'));
  } else {
    return $q.resolve(this.listOfOrders);
  }
}
