'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', 'employeeService', LandingController];

function LandingController($log, $location, employeeService) {
  $log.debug('LandingController');

  let url = $location.url();
  this.showSignup = url === '/join#signup' || url === '/join';
};
