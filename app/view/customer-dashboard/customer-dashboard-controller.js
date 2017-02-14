'use strict';

require('./_customer-dashboard-view.scss');

module.exports = ['$log', '$rootScope', '$location', 'customerService', 'cartOrderService', CustomerDashboardController];

// function CustomerController($log, $location, customerService) {
//   let url = $location.url();
//   this.showSignup = url === '/join#signup' || url === '/join';
// }

function CustomerDashboardController($log, $rootScope, customerService) {
  $log.debug('CustomerDashboardController');

  this.fetchAllOrders = function() {
    customerService.currentCustomer.currentOrder.reverse();
  };

  this.deleteOrders = function(order) {
    if (this.currentOrder._id === order._id) {
      this.currentOrder = null;
    }
  };
}
