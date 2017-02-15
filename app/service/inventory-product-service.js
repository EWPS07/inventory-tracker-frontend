'use strict';

module.exports = ['$q', '$log', '$http', 'storeService', inventoryProductService];

function inventoryProductService($q, $log, $http, storeService) {

  let service = {};
  service.currentInventory = storeService.currentStore.current;

  // ADD NEW PRODUCT TO CURRENT INVENTORY --------------------------------------
  service.addNewProduct = function(product, storeID) {
    $log.debug('inventoryProductService.addNewProduct()');

    let url = `${__API_URL__}/api/store/${storeID}/inventory`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    return $http.post(url, product, config)
    .then( res => service.currentInventory.push(res.data))
    .catch( err => $log.error(err.message));
  };

  // ADD PRODUCT TO INVENTORY ORDER --------------------------------------------
  service.addProductToInventoryOrder = function(product, inventoryOrderID) {
    $log.debug('inventoryProductService.addProductToInventoryOrder()');

    let url = `${__API_URL__}/api/inventory-orders/${inventoryOrderID}/inventory`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    return $http.post(url, product, config)
    .then(res => res.data)
    .catch( err => $log.error(err.message));
  };

  // ADD INVENTORY ORDER TO CURRENT INVENTORY ----------------------------------
  service.addInventoryOrderToCurrentInventory = function(inventoryOrderID) {
    $log.debug('inventoryProductService.addInventoryOrderToCurrentInventory()');

    let url = `${__API_URL__}/api/inventory-orders/${inventoryOrderID}/complete-order`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    return $http.post(url, config)
    .then( res =>
      service.currentInventory.push(res.data)
    )
    .catch(err => $log.error(err.message));
  };

  service.getProduct = function(productID) {
    $log.debug('inventoryProductService.getProduct');

    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    return $http.get(`${__API_URL__}/api/inventory/${productID}`, config)
    .then(response => $q.resolve(response.data))
    .catch(err => $log.error(err.message));
  };

  // UPDATE INVENTORY PRODUCT --------------------------------------------------
  service.updateProduct = function(product, inventoryID) {
    $log.debug('inventoryProductService.updateProduct()');

    let url = `${__API_URL__}/api/inventory/${inventoryID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    return $http.put(url, product, config)
    .catch(err => $log.error(err.message));
  };

  // DELETE PRODUCT FROM UI ----------------------------------------------------
  service.deleteFromUI = function(arr, id) {
    for(let i=0; i<arr.length; i++) {
      if(arr[i]._id === id) {
        arr.splice([i], 1);
        break;
      }
    }
    return arr;
  };

  // DELETE PRODUCT FROM INVENTORY ---------------------------------------------
  service.deleteProduct = function(inventoryID) {
    $log.debug('inventoryProductService.deleteProduct()');

    let url = `${__API_URL__}/api/inventory/${inventoryID}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    return $http.delete(url, config)
    .then(
      service.deleteFromUI(service.currentInventory, inventoryID)
    )
    .catch(err => $log.error(err.message));
  };

  return service;
}
