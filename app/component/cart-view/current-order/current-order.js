'use strict';

module.exports = {
  template: require('./current-order.html'),
  controller: ['$log', '$rootScope', 'customerService', CurrentOrderController],
  controllerAs: 'currentOrderCtrl'
};

function CurrentOrderController($log, $rootScope, customerService) {
  $log.log('Current order controller');

  this.getOrders = function() {
    this.customerOrders = customerService.currentCustomer.currentOrders.filter(_order => !_order.completed).reverse();
    this.currentOrder = customerService.currentCustomer.currentOrders.filter(_order => !_order.completed).reverse()[0]._id;
    customerService.currentOrder = this.currentOrder;
  };

  this.changeOrder = function(orderID) {
    this.currentOrder = customerService.currentCustomer.currentOrders.find(_order => _order._id === orderID)._id;
    customerService.currentOrder = this.currentOrder;
  };

  this.getOrders();

  $rootScope.$on('$locationChangeSuccess', () => this.getOrders());
}
