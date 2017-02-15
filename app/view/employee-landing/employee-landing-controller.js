'use strict';

require('./_employee-landing.scss');

module.exports = ['$log', '$location', 'employeeService', EmployeeLandingController];

function EmployeeLandingController($log, $location, employeeService) {
  $log.debug('LandingController');

  let url = $location.url();
  this.showSignup = url === '/join#signup' || url === '/join';
};
