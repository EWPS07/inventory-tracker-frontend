'use strict';

module.exports = {
  template: require('./current.html'),
  controller: ['$log', 'storeService', CurrentController],
  controllerAs: 'currentCtrl'
};

function CurrentController($log, storeService) {
  $log.log('CurrentController');

  this.storeService = storeService;
}
