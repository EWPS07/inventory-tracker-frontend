'use strict';

require('./_employee-signup.scss');

module.exports = {
  template: require('./employee-signup.html'),
  controller: ['$log', '$location', 'employeeService', '$window', EmployeeSignupController],
  controllerAs: 'employeeSignupCtrl'
};

function EmployeeSignupController($log, $location, employeeService, $window) {
  $log.debug('EmployeeSignupController');

  employeeService.getToken()
  .then( () => {
    $location.url('/employee');
  });

  this.verifyPassword = '';

  this.signup = function(employee) {
    $log.debug('signupControl.signup()');
    if(this.verifyPassword === this.employee.password) {
      return employeeService.registerEmployee(employee)
      .then( () => {
        $location.url('/employee');
      });
    }
    $window.alert('You must confirm your password');
  };
}
