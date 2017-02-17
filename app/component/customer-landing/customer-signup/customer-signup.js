'use strict';

require('./_customer-signup.scss');

module.exports = {
  template: require('./customer-signup.html'),
  controller: ['$log', '$location', 'customerService', CustomerSignupController],
  controllerAs: 'customerSignupCtrl'
};

function CustomerSignupController($log, $location, customerService) {
  $log.debug('CustomerSignupController');

  this.signup = function(customer) {
    $log.debug('customerSignupCtrl.signup()');

    customerService.signup(customer)
    .then( () => {
      $location.url('/shopping');
    });
  };
}
