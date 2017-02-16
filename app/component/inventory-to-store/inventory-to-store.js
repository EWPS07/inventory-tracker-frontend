'use strict';

module.exports = {
  template: require('./inventory-to-store.html'),
  controller: ['$log', 'inventoryProductService', 'storeService', InventoryToStoreController],
  controllerAs: 'inventoryToStoreCtrl'
};

function InventoryToStoreController($log, inventoryProductService, storeService){
  $log.log('InventoryToStoreController');

  this.product = {};

  this.addProduct = function(){
    inventoryProductService.addNewProduct(this.product, storeService.currentStore._id)
    .then(() => {
      this.product = {};
    });
  };
}
