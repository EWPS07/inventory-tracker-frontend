'use strict';

module.exports = {
  template: require('./inventory-products.html'),
  controller: ['$log', 'cartProductService', 'storeService', 'cartOrderService', 'customerService', InventoryProductController],
  controllerAs: 'inventoryProductCtrl'
};

function InventoryProductController($log, cartProductService, storeService, cartOrderService, customerService) {
  $log.log('Inventory Product Controller');

  this.currentProducts = storeService.currentStore.current;

  this.addToCart = function(productData) {
    if (customerService.currentCustomer.currentOrders.length > 0) {
      if (customerService.currentCustomer.currentOrders[customerService.currentCustomer.currentOrders.length - 1].completed) {
        cartOrderService.createOrder()
        .then(_order => this.cartOrder = _order);
      } else {
        this.cartOrder = customerService.currentCustomer.currentOrders[customerService.currentCustomer.currentOrders.length - 1];
      }
    }
    cartProductService.createCartProduct(this.cartOrder._id, storeService.currentStore._id, productData);
  };
}
