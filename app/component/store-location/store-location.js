'use strict';

module.exports = {
  template: require('./store-location.html'),
  controller: ['$log', 'storeService', '$rootScope', 'customerService', StoreLocationController],
  controllerAs: 'storeLocationCtrl'
};

function StoreLocationController($log, storeService, customerService) {
  $log.log('Store Location Controller');

  storeService.getStores()
  .then(() => {
    if (storeService.stores) storeService.currentStore = storeService.stores[0];

    // if (customerService.currentCustomer.favoriteStore) {
    //   storeService.currentStore = storeService.stores.find(_store => _store.storeNumber === customerService.currentCustomer.favoriteStore);
    // }

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
