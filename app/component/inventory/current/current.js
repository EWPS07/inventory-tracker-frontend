'use strict';

module.exports = {
  template: require('./current.html'),
  controller: ['$log', 'storeService', 'inventoryProductService', CurrentController],
  controllerAs: 'currentCtrl'
};

function CurrentController($log, storeService, inventoryProductService) {
  $log.log('CurrentController');

  this.storeService = storeService;
  this.editProduct = function(product) {
    product.name = product.newName;
    product.desc = product.newDesc;
    product.quantity = product.newQuantity;
    product.category = product.newCategory;
    product.price = product.price;
    inventoryProductService.updateProduct(product, product._id)
    .then(() => {
      for(var i = 0; i < storeService.currentStore.current.length; i++){
        if( storeService.currentStore.current[i]._id === product._id ){
          storeService.currentStore.current[i] = product;
          break;
        }
      }
    });
  };
}
