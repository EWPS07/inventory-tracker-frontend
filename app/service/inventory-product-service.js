'use strict';

module.exports = ['$q', '$log', '$http', inventoryProductService];

function inventoryProductService($q, $log, $http) {

  let service = {};

  // ADD NEW PRODUCT TO CURRENT INVENTORY
  service.addNewProduct = function(product) {
    $log.debug('inventoryProductService.addNewProduct()');

    let url = `${__API_URL__}/api/store/${storeID}/inventory`;

    return $http.post(url, product, config)
    .catch( err => $log.error(err.message));
  };

  // ADD PRODUCT TO INVENTORY ORDER
  service.addProductToInventoryOrder = function(product) {
    $log.debug('inventoryProductService.addProductToInventoryOrder()');

    let url = `${__API_URL__}/api/inventory-orders/${inventoryOrderID}/inventory`;

    return $http.post(url, product, config)
    .catch( err => $log.error(err.message));
  };

  // ADD INVENTORY ORDER TO CURRENT INVENTORY
  service.addInventoryOrderToCurrentInventory = function(inventoryOrderID) {
    $log.debug('inventoryProductService.addInventoryOrderToCurrentInventory()');

    let url = `${__API_URL__}/api/inventory-orders/${inventoryOrderID}/complete-order`;

    return $http.post(url, config)
    .catch(err => $log.error(err.message));
  };

  // UPDATE INVENTORY PRODUCT
  service.updateProduct = function(product, inventoryID) {
    $log.debug('inventoryProductService.updateProduct()');

    let url = `${__API_URL__}/api/inventory/${inventoryID}`;

    return $http.put(url, product, config)
    .catch(err => $log.error(err.message));
  };

  // DELETE PRODUCT FROM INVENTORY
  service.deleteProduct = function() {
    $log.debug('inventoryProductService.deleteProduct()');

    let url = `${__API_URL_}/api/inventory/${inventoryID}`;

    return $http.delete(url, config)
    .catch(err => $log.error(err.message));
  };

  return service;
};
