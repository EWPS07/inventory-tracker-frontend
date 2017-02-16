'use strict';

require('./_customer-login.scss');

module.exports = {
  template: require('./customer-login.html'),
  controller: ['$log', '$location', 'customerService', CustomerLoginController],
  controllerAs: 'customerLoginCtrl'
};

function CustomerLoginController($log, $location, customerService) {
  $log.debug('CustomerLoginController');

  this.login = function() {
    $log.log('customerLoginCtrl.login()');

    customerService.login()
    .then( () => {
      $location.url('/customer-dashboard');
    });
  };
}
