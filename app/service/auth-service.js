'use strict';

module.exports = ['$q', '$log', '$http', '$window', 'customerService', 'storeService', authService];

function authService($q, $log, $http, $window, customerService, storeService) {
  $log.debug('authService');

  let service = {};
  let token = null;

  service.logout = function() {
    customerService.currentCustomer = {};
    storeService.currentStore = {};
    return $q.resolve();
  };

  service.getToken = function() {
    $log.debug('authService.getToken');
    if(token) {
      return $q.resolve(token);
    }

    token = $window.localStorage.getItem('token');
    if(token) return $q.resolve(token);
    return $q.reject(new Error('token not found'));
  };

  return service;
}
