'use strict';

module.exports = ['$log', 'customerService', ShoppingController];

function ShoppingController($log, customerService) {
  $log.log('Shopping Controller');

  customerService.currentCustomer = {
    "_id": "58a4af2619435314a4c1ad42",
"address": "asdfouh",
"currentOrders": [{
  "__v": 1,
"_id": "58a4afbf19435314a4c1ad43",
"customerID": "58a4af2619435314a4c1ad42",
"products": [
    {
        "__v": 0,
        "_id": "58a3ffc767312c0f3cf22de9",
        "cartOrderID": "58a4afbf19435314a4c1ad43",
        "category": "animal",
        "desc": "turtle",
        "name": "turtle",
        "price": 1099,
        "quantity": 20
    }
],
"shippingAddress": "asdfouh",
"shippingName": "Steven",
"storeID": "58a3ff9d67312c0f3cf22de8"

},
{
  "__v": 1,
 "_id": "58a4afe819435314a4c1ad44",
 "customerID": "58a4af2619435314a4c1ad42",
 "products": [
     {
         "__v": 0,
         "_id": "58a4a61a19435314a4c1ad40",
         "cartOrderID": "58a4afe819435314a4c1ad44",
         "category": "animal",
         "desc": "It's a nail", 
         "name": "Snill",
         "price": 899,
         "quantity": 10
     }
 ],
 "shippingAddress": "asdfouh",
 "shippingName": "Steven",
 "storeID": "58a4a5f819435314a4c1ad3f"

}],
"email": "test@test.com",
"name": "Steven",
"username": "steve"

  }
}
