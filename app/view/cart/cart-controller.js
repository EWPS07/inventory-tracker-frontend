'use strict';

module.exports = ['$log', 'customerService', CartController];

function CartController($log, customerService) {
  $log.log('Cart controller');

  if (customerService.counter === 0) {
    customerService.currentCustomer =  {
      "_id": "58a4f01a58812c2cf7f940ee",
      "address": "adsofuh",
      "currentOrders": [{
        "__v": 1,
"_id": "58a4f05058812c2cf7f940ef",
"customerID": "58a4f01a58812c2cf7f940ee",
"products": [
    {
        "__v": 0,
        "_id": "58a4e58d58812c2cf7f940de",
        "cartOrderID": "58a4f05058812c2cf7f940ef",
        "category": "animal",
        "desc": "turtle",
        "name": "turtle",
        "price": 899,
        "quantity": 10
    }
],
"shippingAddress": "adsofuh",
"shippingName": "Steven",
"storeID": "58a4e56b58812c2cf7f940dc"

      },
    {
      "__v": 1,
"_id": "58a4f05558812c2cf7f940f0",
"customerID": "58a4f01a58812c2cf7f940ee",
"products": [
    {
        "__v": 0,
        "_id": "58a4e5a858812c2cf7f940df",
        "cartOrderID": "58a4f05558812c2cf7f940f0",
        "category": "animal",
        "desc": "monkey",
        "name": "monkay",
        "price": 599,
        "quantity": 10
    }
],
"shippingAddress": "adsofuh",
"shippingName": "Steven",
"storeID": "58a4e57258812c2cf7f940dd"

    }],
      "email": "oasufdh",
      "name": "Steven",
      "username": "steve"
    };
    customerService.counter++;
  }
}
