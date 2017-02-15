'use strict';

require('./_previous-orders.scss');

module.exports = {
  template: require('./previous-orders.html'),
  controller: ['$q','$log', 'customerService', CustomerPreviousOrdersController],
  controllerAs: 'customerPreviousOrdersCtrl'
};

function CustomerPreviousOrdersController($q, $log, customerService) {
  $log.debug('PreviousOrdersController');

  customerService.currentCustomer = {
    "_id": "58a4bc68bbf4a9510ecd5490",
    "address": "1234 S.",
    "currentOrders": [{ "__v": 0,
    "_id": "58a4bccabbf4a9510ecd5491",
    "customerID": "58a4bc68bbf4a9510ecd5490",
    "date": "2017-02-15T20:35:11.250Z",
    "products": [],
    "shippingAddress": "1234 S.",
    "shippingName": "hello",
    "storeID": "58a4bbc5bbf4a9510ecd548e"}, {"__v": 0,
    "_id": "58a4c061bbf4a9510ecd5492",
    "customerID": "58a4bc68bbf4a9510ecd5490",
    "date": "2017-02-15T20:35:11.250Z",
    "products": [],
    "shippingAddress": "1234 S.",
    "shippingName": "hello",
    "storeID": "58a4bbc5bbf4a9510ecd548e"}],
    "email": "hello@world",
    "name": "hello",
    "username": "helloworld"
  };

  this.arrayOfOrders = customerService.currentCustomer.currentOrders;
  $log.log(this.arrayOfOrders);
  this.noOrders = false;

  if(this.arrayOfOrders.length === 0) {
    $log.log("hitting this line");
    this.noOrders = true;
  }
}
