'use strict';

module.exports = ['$log', '$http', '$q', 'storeService', inventoryOrderService];

function inventoryOrderService($log, $http, $q, storeService) {
  $log.debug('inventory order service');

  let service = {};
  service.incoming = storeService.currentStore.incoming;
  let config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  // POST INVENTORY ORDER TO STORE ---------------------------------------------
  service.addInventoryOrder = function(storeID) {
    $log.debug('inventoryOrderService')
    let url = `${__API_URL__}/api/store/${storeID}/inventory-order`;
    return $http.post(url, config)
    .then(res => {
      this.incoming.push(res.data);
    })
    .catch(err => $log.error(err.message));
  };

  // DELETE ORDER FROM UI ------------------------------------------------------
  service.deleteFromUI = function(arr, id) {
    for(let i=0; i<arr.length; i++) {
      if(arr[i]._id === id) {
        arr.splice([i], 1);
        break;
      }
    }
    return arr;
  }

  // DELETE INVENTORY ORDER ----------------------------------------------------
  service.deleteInventoryOrder = function(inventoryOrderID) {
    $log.debug('inventoryOrderService.deleteInventoryOrder()');

    let url = `${__API_URL__}/api/inventories/${inventoryOrderID}`;

    return $http.delete(url, config)
    .then(
      this.deleteFromUI(this.incoming, inventoryOrderID)
    )
    .catch(err => $log.error(err.message));
  };

  return service;
};
