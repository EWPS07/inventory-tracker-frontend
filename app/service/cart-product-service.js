'use strict';

module.exports = ['$q', '$log', '$http', 'customerService', cartProductService];

function cartProductService($q, $log, $http, customerService) {
  $log.debug('cartProductService()');

  let service = {};

  let url = `${__API_URL__}/api`;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };

  service.createCartProduct = function(cartOrderID, storeID, productData) {
    $log.debug('cartProductService.createCartProduct()');

    return $http.post(`${url}/orders/${cartOrderID}/${storeID}/cart`, productData, config)
    .then(response => {
      customerService.currentCustomer.currentOrders[0].products.push(response.data);
      console.log(customerService.currentCustomer);
      return $q.resolve(response.data);
    })
    .catch( err => $log.error(err.message));
  };

  service.updateCartProduct = function(productID, storeID, productData) {
    $log.debug('cartProductService.updateCartProduct');

    return $http.put(`${url}/store/${storeID}/products/${productID}`, productData, config)
    .then(response => {
      for (var i = 0; i < customerService.currentCustomer.currentOrders[0].products.length; i++) {
        if (customerService.currentCustomer.currentOrders[0].products[i]._id === response.data._id) {
          customerService.currentCustomer.currentOrders[0].products[i] = response.data;
          break;
        }
      }
      console.log(customerService.currentCustomer);
      return $q.resolve(response.data);
    })
    .catch(err => $log.error(err.message));
  };

  service.deleteCartProduct = function(productArray, productID) {
    return $http.delete(`${url}/products/${productID}`)
    .then(() => {
      for (var i = 0; i < productArray.length; i++) {
        if (productArray[i]._id === productID) {
          productArray.splice(i, 1);
          break;
        }
      }
      return productArray;
    })
    .catch(err => $log.error(err.message));
  };

  return service;
}
