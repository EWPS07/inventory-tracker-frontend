'use strict';

module.exports = ['$log', '$http', storeService];

function storeService($log, $http) {
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
    return $http.post(baseUrl, store, config)
    .then(response => service.stores.push(response.data))
    .catch(err => $log.error(err.message));
  };

  service.updateStore = function(store) {
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

  return service;
}
