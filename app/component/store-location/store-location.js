'use strict';

module.exports = {
  template: require('./store-location.html'),
  controller: ['$log', 'storeService', 'customerService', StoreLocationController],
  controllerAs: 'storeLocationCtrl'
};

function StoreLocationController($log, storeService) {
  $log.log('Store Location Controller');

  if (storeService.currentStore) {
    this.currentStore = storeService.currentStore;
    this.currentStoreNumber = this.currentStore.storeNumber;
    this.allStores = storeService.stores;
  }

  this.changeStore = function(storeNumber) {
    $log.log('storeLocationCtrl.changeStore');
    storeService.currentStore = storeService.stores.find(_store => _store.storeNumber === storeNumber);
    this.currentStore = storeService.currentStore;
  };
}
