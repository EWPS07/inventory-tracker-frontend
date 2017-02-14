'use strict';

module.exports = ['$q', '$log', '$http', 'storeService', 'cartOrderService', cartProductService];

function cartProductService($q, $log, $http, authService, customerService, storeService, cartOrderService) {
  $log.debug('cartProductService()');

  let service = {};
  let customerService.currentProduct = customerService.currentProduct.orders[0];

  let url = `${__API_URL__}/api`;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };

  service.createCartProduct = function(cartOrderID, storeID) {
    $log.debug('cartProductService.createCartProduct()');

    return $http.post(`${url}/orders/${cartOrderID}/${storeID}/cart`, config)
    .catch( err => {
      $log.error(err.message);
    });
  };

  service.updateCartProduct = function(productID) {
    $log.debug('cartProductService.putCartProduct()');

    return $http.put(`${__API_URL__}/products/${productID}`, config)
    .then(res => $q.resolve(res.data))
    .catch(err => $log.error(err.message));
  };

  service.deleteCartProduct = function(productID) {
    $log.debug('cartProductService.deleteCartProduct()');

    return $http.delete(`${url}/products/${productID}`, config)
    .catch(err => $log.error(err.message));
  };
}
