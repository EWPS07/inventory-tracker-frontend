'use strict';

require('./_employee-record.scss');

module.exports = {
  template: require('./employee-record.html'),
  controller: ['$log', 'employeeService', EmployeeRecordController],
  controllerAs: 'employeeRecordCtrl',
  bindings: {
    employee: '<',
  }
};

function EmployeeRecordController($log, employeeService) {
  $log.debug('EmployeeRecordController');

  this.showEditEmployeeRecord = false;

  this.deleteEmployeeRecord = function() {
    employeeService.removeEmployee(this.employee._id);
  };
};
