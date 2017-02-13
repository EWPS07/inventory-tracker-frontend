'use strict';

module.exports = ['$log', '$http', storeService];

function storeService($log, $http) {
  $log.debug('Store service');

  let service = {};
  let stores = [];

  let baseUrl = `${__API_URL__}/api/store`;
  let config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  service.addStore = function(store) {
    return $http.post(baseUrl, store, config)
    .then(response => stores.push(response.data))
    .catch(err => $log.error(err.message));
  };

  return service;
}
