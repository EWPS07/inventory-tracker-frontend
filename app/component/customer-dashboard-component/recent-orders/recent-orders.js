'use strict';

require('./_recent-orders.scss');

module.exports = {
  template: require('./recent-orders.html'),
  controller: ['$log', 'customerService', RecentOrdersController],
  controllerAs: 'recentOrdersCtrl'
};

function RecentOrdersController($log, customerService) {
  $log.debug('RecentOrdersController');

  this.order = {};

  this.recentOrders = function() {
    customerService.currentCustomer.currentOrder(this.orders)
    .then( () => {
      this.orders._id = null;
      this.orders.name = null;
    });
  };
}
