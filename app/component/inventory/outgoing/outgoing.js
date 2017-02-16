'use strict';

module.exports = {
  template: require('./outgoing.html'),
  controller: ['$log', 'storeService', OutgoingController],
  controllerAs: 'outgoingCtrl'
};

function OutgoingController($log, storeService) {
  $log.log('OutgoingController');

  this.storeService = storeService;
}
