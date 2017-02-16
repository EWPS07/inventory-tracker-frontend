'use strict';

module.exports = ['$log', 'customerService', CartController];

function CartController($log, customerService) {
  $log.log('Cart controller');

  if (customerService.counter === 0) {
    customerService.currentCustomer =  {
      "_id": "58a4f66458812c2cf7f940f6",
      "address": "aosfddu",
      "currentOrders": [{
        "__v": 2,
"_id": "58a4f69558812c2cf7f940f7",
"customerID": "58a4f66458812c2cf7f940f6",
"products": [
    {
        "__v": 0,
        "_id": "58a4f61c58812c2cf7f940f2",
        "cartOrderID": "58a4f69558812c2cf7f940f7",
        "category": "animal",
        "desc": "turtle",
        "name": "turtle",
        "price": 1099,
        "quantity": 20
    },
    {
        "__v": 0,
        "_id": "58a4f62958812c2cf7f940f3",
        "cartOrderID": "58a4f69558812c2cf7f940f7",
        "category": "animal",
        "desc": "monkey",
        "name": "monkay",
        "price": 1099,
        "quantity": 15
    }
],
"shippingAddress": "aosfddu",
"shippingName": "Steve",
"storeID": "58a4e56b58812c2cf7f940dc"

      },
    {
      "__v": 1,
"_id": "58a4f69e58812c2cf7f940f8",
"customerID": "58a4f66458812c2cf7f940f6",
"products": [
    {
        "__v": 0,
        "_id": "58a4f63d58812c2cf7f940f4",
        "cartOrderID": "58a4f69e58812c2cf7f940f8",
        "category": "animal",
        "desc": "snill",
        "name": "snail",
        "price": 1099,
        "quantity": 10
    }
],
"shippingAddress": "aosfddu",
"shippingName": "Steve",
"storeID": "58a4e57258812c2cf7f940dd"

    }],
      "email": "afsddou",
      "name": "Steve",
      "username": "steven"
    };
    customerService.counter++;
  }
}
