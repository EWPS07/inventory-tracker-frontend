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

  service.createCartProduct = function(cartOrderID, storeID, productData, cartOrder) {
    $log.debug('cartProductService.createCartProduct()');

    let sentProduct = {
      name: productData.name,
      desc: productData.desc,
      quantity: productData.quantity,
      buyQuantity: productData.buyQuantity,
      category: productData.category,
      price: productData.price
    };
    
    return $http.post(`${url}/orders/${cartOrderID}/${storeID}/cart`, sentProduct, config)
    .then(response => {
      for (var i = 0; i < customerService.currentCustomer.currentOrders.length; i++) {
        if (customerService.currentCustomer.currentOrders[i]._id === cartOrder._id) {
          customerService.currentCustomer.currentOrders[i].products.push(response.data);
          break;
        }
      }
      response.data.editMe = false;
      return $q.resolve(response.data);
    })
    .catch( err => $log.error(err.message));
  };

  service.updateCartProduct = function(productID, storeID, productData, cartOrder) {
    $log.debug('cartProductService.updateCartProduct');

    return $http.put(`${url}/store/${storeID}/products/${productID}`, productData, config)
    .then(response => {
      for (var i = 0; i < customerService.currentCustomer.currentOrders.length; i++) {
        if (customerService.currentCustomer.currentOrders[i]._id === cartOrder._id) {
          for (var j = 0; j < customerService.currentCustomer.currentOrders[i].products.length; j++) {
            if (customerService.currentCustomer.currentOrders[i].products[j]._id === response.data._id) {
              customerService.currentCustomer.currentOrders[i].products[j] = response.data;
              break;
            }
          }
        }
      }
      response.data.editMe = false;
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
      return $q.resolve(productArray);
    })
    .catch(err => $log.error(err.message));
  };

  return service;
}
