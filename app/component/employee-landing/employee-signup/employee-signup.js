'use strict';

require('./_employee-signup.scss');

module.exports = {
  template: require('./employee-signup.html'),
  controller: ['$log', '$location', 'employeeService', EmployeeSignupController],
  controllerAs: 'employeeSignupCtrl'
};

function EmployeeSignupController($log, $location, employeeService) {
  $log.debug('EmployeeSignupController');

  employeeService.getToken()
  .then( () => {
    $location.url('/employee');
  });

  this.signup = function(employee) {
    $log.debug('signupControl.signup()');

    employeeService.registerEmployee(employee)
    .then( () => {
      $location.url('/employee');
    });
  };
};
