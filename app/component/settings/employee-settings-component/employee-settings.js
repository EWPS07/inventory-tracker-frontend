'use strict';
require('./_employee-settings.scss');

module.exports = {
  template: require('./employee-settings.html'),
  controller: ['$log', 'employeeService', EmployeeSettingsController],
  controllerAs: 'employeeSettingsCtrl'
};

function EmployeeSettingsController($log, employeeService) {
  $log.debug('EmployeeSettingsController');

  this.currentEmployee = employeeService.currentEmployee;

  this.updateEmployeeInfo = function(employeeData) {
    $log.log(this.currentEmployee);

    employeeService.updateEmployee(this.currentStore._id, this.currentEmployee._id, employeeData);
  };
}
