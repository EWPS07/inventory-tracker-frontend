'use strict';

module.exports = {
  template: require('./store-location.html'),
  controller: ['$log', 'storeService', 'customerService', StoreLocationController],
  controllerAs: 'storeLocationCtrl'
};

function StoreLocationController($log, storeService, customerService) {
  storeService.getStores();

  if (storeService.stores) {
    this.currentStore = storeService.stores[0];
    storeService.currentStore = storeService.stores[0];
    this.allStores = storeService.stores;
  }

  if (customerService.currentCustomer.favoriteStore) {
    storeService.currentStore = storeService.stores.find(_store => _store.storeNumber === customerService.currentCustomer.favoriteStore);
    this.currentStore = storeService.currentStore;
  }

  this.changeStore = function(storeNumber) {
    storeService.currentStore = storeService.stores.find(_store => _store.storeNumber === storeNumber);
    this.currentStore = storeService.currentStore;
  };
}
