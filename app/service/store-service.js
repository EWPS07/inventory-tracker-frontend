'use strict';

module.exports = ['$log', '$http', '$q', storeService];

function storeService($log, $http, $q) {
  $log.debug('Store service');

  let service = {};

  let baseUrl = `${__API_URL__}/api/store`;
  let config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };
  return service;
}
