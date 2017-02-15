'use strict';

require('./_previous-orders.scss');

module.exports = {
  template: require('./previous-orders.html'),
  controller: ['$q','$log', 'customerService', CustomerPreviousOrdersController],
  controllerAs: 'customerPreviousOrdersCtrl',
  bindings: {
    arrayOfOrders: '<'
  }
};

function CustomerPreviousOrdersController($q, $log) {
  $log.debug('PreviousOrdersController');

  this.noOrders = false;

  if(this.arrayOfOrders.length === 0) {
    this.noOrders = true;
  }
}
