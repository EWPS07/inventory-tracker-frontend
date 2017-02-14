'use strict';

module.exports = ['$log', '$http', '$q', inventoryOrderService];

function inventoryOrderService($log, $http, $q, storeService) {
  $log.debug('inventory order service');

  let service = {};
  let config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  // POST INVENTORY ORDER TO STORE
  service.addInventoryOrder = function(storeID) {
    $log.debug('inventoryOrderService')
    let url = `${__API_URL__}/api/store/${storeID}/inventory-order`;
    return $http.post(url, config)
    .catch(err => $log.error(err.message));
  };

  // DELETE INVENTORY ORDER
  service.deleteInventoryOrder = function(inventoryOrderID) {
    $log.debug('inventoryOrderService.deleteInventoryOrder()');

    let url = `${__API_URL__}/api/inventories/${inventoryOrderID}`;

    return $http.delete(url, config)
    .catch(err => $log.error(err.message));
  };

  return service;
};
