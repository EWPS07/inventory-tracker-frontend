'use strict';

module.exports = {
  template: require('./cart-products.html'),
  controller: ['$log', 'cartProductService', 'storeService', 'cartOrderService', 'customerService', InventoryProductController],
  controllerAs: 'cartProductCtrl'
};

function InventoryProductController($log, cartProductService, storeService, cartOrderService, customerService) {
  $log.log('Inventory Product Controller');

  storeService.getStores()
  .then(() => {
    if (storeService.stores) storeService.currentStore = storeService.stores[0];

    if (customerService.currentCustomer.favoriteStore) {
      storeService.currentStore = storeService.stores.find(_store => _store.storeNumber === customerService.currentCustomer.favoriteStore);
    }
    this.currentProducts = storeService.currentStore.current;
  });


  this.addToCart = function(productData) {
    if (customerService.currentCustomer.currentOrders.length > 0) {
      if (customerService.currentCustomer.currentOrders[customerService.currentCustomer.currentOrders.length - 1].completed) {
        cartOrderService.createOrder()
        .then(_order => this.cartOrder = _order);
      } else {
        this.cartOrder = customerService.currentCustomer.currentOrders[customerService.currentCustomer.currentOrders.length - 1];
      }
    }
    if (productData.buyQuantity > productData.quantity) {
      //return You can't buy that
    }
    cartProductService.createCartProduct(this.cartOrder._id, storeService.currentStore._id, productData);
  };
}
