'use strict';

require('./_customer-login.scss');

module.exports = {
  template: require('./customer-login.html'),
  controller: ['$log', '$location', 'customerService', CustomerLoginController],
  controllerAs: 'customerLoginCtrl'
};

function CustomerLoginController($log, $location, customerService) {
  $log.debug('CustomerLoginController');

  this.login = function(customer) {
    $log.log('customerLoginCtrl.login()');

    customerService.login(customer)
    .then( () => {
      $location.url('/customer-dashboard');
    });
  };
}
