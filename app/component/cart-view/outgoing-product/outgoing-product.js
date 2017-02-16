'use strict';

module.exports = {
  template: require('./outgoing-product.html'),
  controller: ['$log', 'customerService', 'cartProductService', 'cartOrderService', OutgoingProductController],
  controllerAs: 'outgoingProductCtrl'
};

function OutgoingProductController($log, customerService, cartProductService, cartOrderService) {
  $log.log('Outgoing product controller');

  this.customerService = customerService;

  this.editQuantity = function(product) {
    if (product.quantity === product.newQuantity) return; //Call delete item;
    product.quantity = product.newQuantity - product.quantity;
    cartProductService.updateCartProduct(product._id, customerService.currentOrder.storeID, product, customerService.currentOrder)
    .then(() => {
      customerService.currentTotal = 0;
      customerService.currentOrder.products.forEach(product => customerService.currentTotal += (product.quantity * product.price));
    });
  };

  this.deleteItem = function(product) {
    product.quantity = -Math.abs(product.quantity);
    cartProductService.updateCartProduct(product._id, customerService.currentOrder.storeID, product, customerService.currentOrder)
    .then(() => {
      customerService.currentTotal = 0;
      customerService.currentOrder.products.forEach(product => customerService.currentTotal += (product.quantity * product.price));
      return cartProductService.deleteCartProduct(customerService.currentOrder.products, product._id);
    })
    .then(() => {
      if (customerService.currentOrder.products.length === 0) {
        for (var i = 0; i < customerService.currentCustomer.currentOrders.length; i++) {
          if (customerService.currentCustomer.currentOrders[i]._id === customerService.currentOrder._id) {
            customerService.currentCustomer.currentOrders.splice(i, 1);
            break;
          }
        }
        for (var j = 0; j < customerService.currentActiveOrders.length; j++) {
          if (customerService.currentActiveOrders[j]._id === customerService.currentOrder._id) {
            customerService.currentActiveOrders.splice(j, 1);
            break;
          }
        }
        cartOrderService.deleteOrder(product.cartOrderID);
      }
    });
  };
}
