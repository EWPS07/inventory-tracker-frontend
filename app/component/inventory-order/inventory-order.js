'use strict';

module.exports = {
  template: require('./inventory-order.html'),
  controller: ['$log', 'storeService', 'inventoryOrderService', 'inventoryProductService', InventoryOrderController],
  controllerAs: 'inventoryOrderCtrl'
};

function InventoryOrderController($log, storeService, inventoryOrderService, inventoryProductService){
  $log.log('InventoryOrderController');

  this.storeService = storeService;

  this.createOrder = function() {
    return new Promise((resolve) => {
      let lastOrder = storeService.currentStore.incoming[storeService.currentStore.incoming.length-1];

      if(lastOrder && !lastOrder.completed) {
        inventoryOrderService.getOrder(lastOrder._id)
        .then(_order => {
          this.currentOrder = _order;
          inventoryOrderService.currentOrder = this.currentOrder;
          return resolve();
        });
      }

      inventoryOrderService.addInventoryOrder(storeService.currentStore._id)
      .then( order => {
        this.currentOrder = order;
        inventoryOrderService.currentOrder = this.currentOrder;
        return resolve();
      });
    });
  };

  this.addToOrder = function(product) {
    this.createOrder()
    .then(() => {
      let updateProduct = inventoryOrderService.currentOrder.inventories.find(_product => _product.desc === product.desc);

      if(updateProduct){
        updateProduct.quantity += updateProduct.buyQuantity;
        inventoryProductService.updateProduct(updateProduct, inventoryOrderService.currentOrder._id);
        return;
      }
      product.quantity = product.buyQuantity;
      $log.log(inventoryOrderService.currentOrder);
      inventoryProductService.addProductToInventoryOrder(product, this.currentOrder._id);
    });
  };
}
