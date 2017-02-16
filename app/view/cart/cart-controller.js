'use strict';

module.exports = ['$log', 'customerService', CartController];

function CartController($log, customerService) {
  $log.log('Cart controller');

  if (customerService.counter === 0) {
    customerService.currentCustomer =  {
      "_id": "58a4e8ab58812c2cf7f940e5",
      "address": "aoisdfu",
      "currentOrders": [],
      "email": "aosufh",
      "name": "Steven",
      "username": "steve"
    };
    customerService.counter++;
  }
}
