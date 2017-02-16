'use strict';

module.exports = ['$log', '$http', '$q', cartOrderService];

function cartOrderService($log, $http, $q) {
  $log.debug('Cart order service');

  let service = {};

  let url = `${__API_URL__}/api/orders`;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };

  service.createOrder = function(storeID, customerID) {
    $log.log('cartOrderService.createOrder');

    return $http.post(`${url}/${customerID}/${storeID}/cart-order`, config)
    .then(response => $q.resolve(response.data))
    .catch(err => $log.error(err.message));
  };

  service.getOrder = function(orderID) {
    $log.log('cartOrderService.getOrder');

    return $http.get(`${url}/${orderID}`, config)
    .then(response => $q.resolve(response.data))
    .catch(err => $log.error(err.message));
  };

  service.updateOrder = function(orderID, orderData) {
    $log.log('cartOrderService.updateOrder');

    return $http.put(`${url}/${orderID}`, orderData, config)
    .catch(err => $log.error(err.message));
  };

  service.deleteOrder = function(orderID) {
    $log.log('cartOrderService.deleteOrder');

    return $http.delete(`${url}/${orderID}`, config)
    .catch(err => $log.error(err.message));
  };

  return service;
}
