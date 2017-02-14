'use strict';

module.exports = ['$log', '$http', '$q', storeService];

function storeService($log, $http, $q) {
  $log.debug('Store service');

  let service = {};
  service.stores = [];

  let baseUrl = `${__API_URL__}/api/store`;
  let config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  service.addStore = function(store) {
    $log.debug('storeService.addStore');

    return $http.post(baseUrl, store, config)
    .then(response => service.stores.push(response.data))
    .catch(err => $log.error(err.message));
  };

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

  service.getStores = function() {
    $log.debug('storeService.getStores');

    return $http.get(baseUrl, config)
    .then(response => {
      service.stores = response.data;
      return $q.resolve(response.data);
    })
    .catch(err => $log.error(err.message));
  };

  service.getStore = function(storeID) {
    $log.debug('storeService.getStore');

    return $http.get(`${baseUrl}/${storeID}`, config)
    .then(response => $q.resolve(response.data))
    .catch(err => $log.error(err.message));
  };

  service.deleteStore = function(storeID) {
    $log.debug('storeService.deleteStore');

    return $http.delete(`${baseUrl}/${storeID}`, config)
    .then(() => service.stores = service.stores.filter(_store => _store._id !== storeID))
    .catch(err => $log.error(err.message));
  };

  return service;
}
