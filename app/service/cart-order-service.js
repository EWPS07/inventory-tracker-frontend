'use strict';

module.exports = ['$log', '$http', '$q', cartOrderService];

function cartOrderService($log, $http, $q) {
  $log.debug('Cart order service');

  let service = {};
  service.cartProducts = [];

  let url = `${__API_URL__}/api/orders`;

  service.createOrder = function(storeID, customerID) {
    $log.log('cartOrderService.createOrder');

    return $http.post(`${url}/${customerID}/${storeID}/cart-order`)
    .catch(err => $log.error(err.message));
  };
}
