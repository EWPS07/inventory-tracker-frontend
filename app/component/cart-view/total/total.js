'use strict';

module.exports = {
  template: require('./total.html'),
  controller: ['$log', 'customerService', TotalController],
  controllerAs: 'totalCtrl'
};

function TotalController($log, customerService) {
  $log.log('Total Controller');

  this.customerService = customerService;
}
