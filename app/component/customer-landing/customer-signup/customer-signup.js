'use strict';

require('./_customer-signup.scss');

module.exports = {
  template: require('./customer-signup.html'),
  controller: ['$log', '$location', 'customerService', '$window', CustomerSignupController],
  controllerAs: 'customerSignupCtrl'
};

function CustomerSignupController($log, $location, customerService, $window) {
  $log.debug('CustomerSignupController');

  this.verifyPassword = '';

  this.signup = function(customer) {
    $log.debug('customerSignupCtrl.signup()');

    if(this.verifyPassword === this.customer.password) {
      return customerService.signup(customer)
      .then( () => {
        $location.url('/shopping');
      });
    }
    $window.alert('You must confirm your password');
  };
}
