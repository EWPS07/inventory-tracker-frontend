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

    // if (customerService.currentCustomer.favoriteStore) {
    //   storeService.currentStore = storeService.stores.find(_store => _store.storeNumber === customerService.currentCustomer.favoriteStore);
    // }
    this._storeService = storeService;
  });

  this.createOrUpdateOrder = function() {
    return new Promise((resolve) => {
      let customerCurrentOrders = customerService.currentCustomer.currentOrders;
      //Check if the customer has a cart order associated with this store
      let currentStoreOrder = customerCurrentOrders.find(_order => _order.storeID === storeService.currentStore._id);

      //If they do, and it's not completed, then add to the active order for that store
      if (currentStoreOrder && !currentStoreOrder.completed) {
        this.cartOrder = currentStoreOrder;
        return resolve();
      }
      //If they don't have a cart order for that store, or they do, but it's completed, make a new order
      cartOrderService.createOrder(storeService.currentStore._id, customerService.currentCustomer._id)
      .then(_order => {
        customerCurrentOrders.push(_order);
        this.cartOrder = _order;
        return resolve();
      });
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
        buyProduct = cartProductService.updateCartProduct(productData._id, storeService.currentStore._id, productData, this.cartOrder);
      } else {
        buyProduct = cartProductService.createCartProduct(this.cartOrder._id, storeService.currentStore._id, productData, this.cartOrder);
      }
      buyProduct.then(() => inventoryProductService.getProduct(productData._id))
      .then(_product => {
        for (var i = 0; i < this._storeService.currentStore.current.length; i++) {
          if (this._storeService.currentStore.current[i]._id === productData._id) {
            this._storeService.currentStore.current[i] = _product;
            break;
          }
        }
        console.log(customerService.currentCustomer);
      });
    });
  };
}
