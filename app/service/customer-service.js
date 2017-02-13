'use strict';

module.exports = ['$location', '$q', '$log', '$http', '$window', customerService];

function customerService($location, $q, $log, $http, $window) {
  $log.debug('customerService()');

  let service = {};
  service.currentCustomer = {};

  service.signup = function(user) {
    $log.debug('customerService.signup()');

    let url = `${__API_URL__}/api/signup`;
    let base64 = $window.btoa(`${user.username}:${user.password}`);
    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`
      }
    };

    return $http.post(url, user, config)
    .then( res => {
      $log.log('sucess', res.data);
      service.currentCustomer = res.data;
      return $q.resolve(); //TODO: what am I returning?
    })
    .catch(err => {
      $log.error('failure', err.message);
      return $q.reject(err);
    });
  };


  service.login = function(user){
    $log.debug('customerService.signin()');

    let url = `${__API_URL__}/api/signin`;
    let base64 = $window.btoa(`${user.username}:${user.password}`);
    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`
      }
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('success', res.data);
      return $q.resolve();
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.logout = function() {
    $log.debug('customerService.logout()');

    service.currentCustomer = {};

    $location.url('/login');

    return $q.resolve();
  };

  return service;
}
