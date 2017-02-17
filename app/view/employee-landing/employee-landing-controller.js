'use strict';

require('./_employee-landing.scss');

module.exports = ['$log', '$location', EmployeeLandingController];

function EmployeeLandingController($log, $location) {
  $log.debug('LandingController');

  let url = $location.url();
  this.showSignup = url === '/join#signup' || url === '/join';
}
