'use strict';

module.exports = {
  template: require('./store-location.html'),
  controller: ['$log', 'storeService', StoreLocationController],
  controllerAs: 'storeLocationCtrl'
};

function StoreLocationController($log, storeService) {
  $log.log('Store Location Controller');

  storeService.getStores()
  .then(() => {
    if (storeService.stores) storeService.currentStore = storeService.stores[0];

    this.currentStore = storeService.currentStore;
    this.allStores = storeService.stores;
    this.currentStoreNumber = this.currentStore.storeNumber;
  });

  this.changeStore = function(storeNumber) {
    $log.log('storeLocationCtrl.changeStore');
    storeService.currentStore = storeService.stores.find(_store => _store.storeNumber === storeNumber);
    this.currentStore = storeService.currentStore;
  };
}
