'use strict';

module.exports = {
  template: require('./current-order.html'),
  controller: ['$log', 'customerService', CurrentOrderController],
  controllerAs: 'currentOrderCtrl'
};

function CurrentOrderController($log, customerService) {
  $log.log('Current order controller');

  this.getOrders = function() {
    this.customerOrders = customerService.currentCustomer.currentOrders.filter(_order => !_order.completed).reverse();
    this.currentOrder = this.customerOrders[0];
  };

  this.changeOrder = function(orderID) {
    this.currentOrder = this.customerOrders.find(_order => _order._id === orderID);
  };
}
