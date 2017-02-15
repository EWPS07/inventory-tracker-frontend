'use strict';

module.exports = {
  template: require('./cart-products.html'),
  controller: ['$log', 'cartProductService', 'storeService', 'cartOrderService', 'customerService', 'inventoryProductService', CartProductController],
  controllerAs: 'cartProductCtrl'
};

function CartProductController($log, cartProductService, storeService, cartOrderService, customerService, inventoryProductService) {
  $log.log('Inventory Product Controller');

  storeService.getStores()
  .then(() => {
    if (storeService.stores) storeService.currentStore = storeService.stores[0];

    if (customerService.currentCustomer.favoriteStore) {
      storeService.currentStore = storeService.stores.find(_store => _store.storeNumber === customerService.currentCustomer.favoriteStore);
    }
    this.currentProducts = storeService.currentStore.current;
  });

  this.createOrUpdateOrder = function() {
    return new Promise((resolve) => {
      if (customerService.currentCustomer.currentOrders.length > 0) {
        if (customerService.currentCustomer.currentOrders[customerService.currentCustomer.currentOrders.length - 1].completed) {
          cartOrderService.createOrder(storeService.currentStore._id, customerService.currentCustomer._id)
          .then(_order => {
            customerService.currentCustomer.currentOrders.push(_order);
            this.cartOrder = _order;
            return resolve();
          });
        } else {
          this.cartOrder = customerService.currentCustomer.currentOrders[customerService.currentCustomer.currentOrders.length - 1];
          return resolve();
        }
      } else {
        cartOrderService.createOrder(storeService.currentStore._id, customerService.currentCustomer._id)
        .then(_order => {
          customerService.currentCustomer.currentOrders.push(_order);
          this.cartOrder = _order;
          return resolve();
        });
      }
    });
  };

  this.addToCart = function(productData) {
    this.createOrUpdateOrder()
    .then(() => {
      if (productData.buyQuantity > productData.quantity) {
        return; //You can't buy that
      }
      productData.quantity = productData.buyQuantity;
      let buyProduct;
      if (this.cartOrder.products.find(_product => _product.desc === productData.desc)) {
        buyProduct = cartProductService.updateCartProduct(productData._id, storeService.currentStore._id, productData);
      } else {
        buyProduct = cartProductService.createCartProduct(this.cartOrder._id, storeService.currentStore._id, productData);
      }
      buyProduct.then(() => inventoryProductService.getProduct(productData._id))
      .then(_product => {
        for (var i = 0; i < this.currentProducts.length; i++) {
          if (this.currentProducts[i]._id === productData._id) {
            this.currentProducts[i] = _product;
            break;
          }
        }
      });
    });
  };
}
