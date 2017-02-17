'use strict';

require('./_employee-login.scss');

module.exports = {
  template: require('./employee-login.html'),
  controller: ['$log', '$location', 'employeeService', EmployeeLoginController],
  controllerAs: 'employeeLoginCtrl'
};

function EmployeeLoginController($log, $location, employeeService) {
  $log.debug('EmployeeLoginController');

  employeeService.getToken()
  .then( () => {
    $location.url('/employee');
  });

  this.login = function() {
    $log.debug('employeeLoginCtrl.login()');

    employeeService.loginEmployee(this.employee)
    .then( () => {
      $location.url('/employee');
    });
  };
}
