'use strict';

require('./_customer-landing.scss');

module.exports = ['$log', '$location', CustomerLandingController];

function CustomerLandingController($log, $location) {
  $log.debug('CustomerLandingController');

  let url = $location.url();
  this.showSignup = url === '/create-account' || url === '/create-account';
}
