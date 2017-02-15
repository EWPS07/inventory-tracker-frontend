'use strict';

require('./_customer-dashboard-view.scss');

module.exports = ['$log', '$rootScope', 'customerService', CustomerDashboardController];

// function CustomerController($log, $location, customerService) {
//   let url = $location.url();
//   this.showSignup = url === '/join#signup' || url === '/join';
// }

function CustomerDashboardController($log, $rootScope, customerService) {
  $log.debug('CustomerDashboardController');

  this.fetchAllOrders = function() {
    customerService.currentCustomer.currentOrder.reverse();
  };

  this.orderDeleteDone = function(order) {
    if (this.currentCustomer.currentOrder._id === order._id) {
      this.currentCustomer.currentOrder = null;
    }
  };

  this.fetchAllOrders();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchAllOrders();
  });
}
