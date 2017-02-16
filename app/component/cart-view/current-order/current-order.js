'use strict';

module.exports = {
  template: require('./current-order.html'),
  controller: ['$log', '$rootScope', 'customerService', 'cartOrderService', CurrentOrderController],
  controllerAs: 'currentOrderCtrl'
};

function CurrentOrderController($log, $rootScope, customerService, cartOrderService) {
  $log.log('Current order controller');

  this.getOrders = function() {
    this.customerOrders = customerService.currentCustomer.currentOrders.filter(_order => !_order.completed).reverse();
    this.currentOrder = customerService.currentCustomer.currentOrders.filter(_order => !_order.completed).reverse()[0]._id;
    customerService.currentOrder = this.customerOrders[0];
    cartOrderService.getOrder(customerService.currentOrder._id)
    .then(order => {
      customerService.currentOrder.products = order.products;
      customerService.currentTotal = 0;
      customerService.currentOrder.products.forEach(product => customerService.currentTotal += (product.quantity * product.price));
    });
  };

  this.changeOrder = function(orderID) {
    this.currentOrder = customerService.currentCustomer.currentOrders.find(_order => _order._id === orderID)._id;
    customerService.currentOrder = customerService.currentCustomer.currentOrders.find(_order => _order._id === orderID);
    cartOrderService.getOrder(customerService.currentOrder._id)
    .then(order => {
      customerService.currentOrder.products = order.products;
      customerService.currentTotal = 0;
      customerService.currentOrder.products.forEach(product => customerService.currentTotal += (product.quantity * product.price));
    });
  };

  this.getOrders();

  $rootScope.$on('$locationChangeSuccess', () => this.getOrders());
}
