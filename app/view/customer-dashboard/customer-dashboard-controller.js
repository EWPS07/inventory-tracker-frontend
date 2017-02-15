'use strict';

require('./_customer-dashboard.scss');

module.exports = ['$log', '$rootScope', 'customerService', CustomerDashboardController];

// function CustomerController($log, $location, customerService) {
//   let url = $location.url();
//   this.showSignup = url === '/join#signup' || url === '/join';
// }

function CustomerDashboardController($log, $rootScope, customerService){
  $log.debug('CustomerDashboardController');

  this.fetchAllOrders = function() {
    customerService.currentCustomer.currentOrders.reverse();
  };

  this.orderDeleteDone = function(order) {
    if (this.currentCustomer.currentOrders._id === order._id) {
      this.currentCustomer.currentOrders = null;
    }
  };

  this.allOrders = this.fetchAllOrders();

}
