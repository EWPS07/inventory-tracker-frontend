'use strict';

module.exports = ['$log', 'storeService', 'customerService', ShoppingController];

function ShoppingController($log, storeService, customerService) {
  $log.log('Shopping Controller');

  storeService.getStores()
  .then(() => {
    if (storeService.stores) storeService.currentStore = storeService.stores[0];

    if (customerService.currentCustomer.favoriteStore) {
      storeService.currentStore = storeService.stores.find(_store => _store.storeNumber === customerService.currentCustomer.favoriteStore);
    }
  });

}
