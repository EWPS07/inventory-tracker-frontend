'use strict';

module.exports = {
  template: require('./inventory-products.html'),
  controller: ['$log', 'inventoryProductService', 'storeService', InventoryProductController],
  controllerAs: 'inventoryProductCtrl'
};

function InventoryProductController($log, inventoryProductService, storeService) {
  this.currentProducts = storeService.currentStore.current;
}
