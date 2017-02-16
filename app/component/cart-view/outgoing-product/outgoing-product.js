'use strict';

module.exports = {
  template: require('./outgoing-product.html'),
  controller: ['$log', 'customerService', 'cartProductService', OutgoingProductController],
  controllerAs: 'outgoingProductCtrl'
};

function OutgoingProductController($log, customerService, cartProductService) {
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
      cartProductService.deleteCartProduct(customerService.currentOrder.products, product._id);
    });
  };
}
