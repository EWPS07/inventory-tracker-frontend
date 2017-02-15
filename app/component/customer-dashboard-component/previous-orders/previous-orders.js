'use strict';

require('./_recent-orders.scss');

module.exports = {
  template: require('./recent-orders.html'),
  controller: ['$log', 'customerService', CustomerPreviousOrdersController],
  controllerAs: 'customerPreviousOrdersCtrl',
  bindings: {
    customer: '<'
  }
};

function CustomerPreviousOrdersController($log, customerService) {
  $log.debug('PreviousOrdersController');

  this.showEditPreviousOrders = true;

  //TODO: What do I want displayed?
  // this.previousOrders = function() {
  //   customerService.currentCustomer.currentOrder(this.orders)
  //   .then( () => {
  //     this.orders._id = null;
  //     this.orders.name = null;
  //   });
  // };

  //TODO: Do I need this functionality?
  this.deletePreviousOrders = function() {
    customerService.currentCustomer.removePreviousOrder(this.currentCustomer.currentOrder._id);
  };
}
