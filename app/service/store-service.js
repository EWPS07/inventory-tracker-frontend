'use strict';

module.exports = ['$log', '$http', '$q', storeService];

function storeService($log, $http, $q) {
  $log.debug('Store service');

  let service = {};
  service.stores = [];
  service.currentStore = {};

  let baseUrl = `${__API_URL__}/api/store`;
  let config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  // ADD STORE -----------------------------------------------------------------
  service.addStore = function(store) {
    $log.debug('storeService.addStore');

    return $http.post(baseUrl, store, config)
    .then(response => service.stores.push(response.data))
    .catch(err => $log.error(err.message));
  };

  // EDIT STORE ----------------------------------------------------------------
  service.updateStore = function(store) {
    $log.debug('storeService.updateStore');

    return $http.put(`${baseUrl}/${store._id}`, store, config)
    .then(response => {
      for (var i = 0; i < service.stores.length; i++) {
        if (service.stores[i]._id === response.data._id) {
          service.stores[i] = response.data;
          break;
        }
      }
    })
    .catch(err => $log.error(err.message));
  };

  // GET ALL STORES ------------------------------------------------------------
  service.getStores = function() {
    $log.debug('storeService.getStores');

    return $http.get(baseUrl, config)
    .then(response => service.stores = response.data)
    .catch(err => $log.error(err.message));
  };

  // GET SPECIFIC STORE --------------------------------------------------------
  service.getStore = function(storeID) {
    $log.debug('storeService.getStore');

    return $http.get(`${baseUrl}/${storeID}`, config)
    .then( response => {
      service.currentStore = response.data;
      $q.resolve(response.data)
      }
    )
    .catch(err => $log.error(err.message));
  };

  // DELETE A STORE ------------------------------------------------------------
  service.deleteStore = function(storeID) {
    $log.debug('storeService.deleteStore');

    return $http.delete(`${baseUrl}/${storeID}`, config)
    .then(() => service.stores = service.stores.filter(_store => _store._id !== storeID))
    .catch(err => $log.error(err.message));
  };

  return service;
}
