'use strict';

require('./_add-employee.scss');

// TODO: BUILD OUT ADD EMPLOYEE RECORD COMPONENT
module.exports = {
  template: require('./add-employee.html'),
  controller: ['$log', 'employeeService', AddEmployeeController],
  controllerAs: 'addEmployeeCtrl'
};

function AddEmployeeController($log, employeeService) {
  $log.debug('AddEmployeeController');

  this.employee = {};

  this.addEmployeeRecord = function() {
    employeeService.addEmployeeAsAdmin(this.employee)
    .then( () => {
      this.employee.name = null;
      this.employee.desc = null;
    });
  };
};
