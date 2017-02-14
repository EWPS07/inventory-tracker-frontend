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

  service.updateCartProduct = function(products, productID, productData) {
    $log.debug('cartProductService.putCartProduct()');

    return $http.put(`${__API_URL__}/products/${productID}`, productData, config)
    .then( res => {
    for (let i = 0; i < service.currentProduct.length; i++) {
       let current = service.currentProduct[i];

       if (current._id === productID) {
           service.currentProducts[i] = res.data;
           break;
       }
    };

    return res.data;
    })

    .catch(err => $log.error(err.message));
  };

  service.deleteCartProduct = function(productID) {
    $log.debug('cartProductService.deleteCartProduct()');

    return $http.delete(`${url}/products/${productID}`, config)
    .then( res => {
    for (let i = 0; i < service.currentProduct.length; i++) {
       let current = service.currentProduct[i];

       if (current._id === productID) {
           service.currentProducts.splice(i, 1);
           break;
       }
    };
    .catch(err => $log.error(err.message));
  };
}
