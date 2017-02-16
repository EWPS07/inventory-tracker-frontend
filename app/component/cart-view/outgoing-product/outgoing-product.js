'use strict';

module.exports = {
  template: require('./outgoing-product.html'),
  controller: ['$log', 'customerService', OutgoingProductController],
  controllerAs: 'outgoingProductCtrl'
};

function OutgoingProductController($log, customerService) {
  $log.log('Outgoing product controller');

  this.outgoingProducts = customerService.currentOrder.products;
}
