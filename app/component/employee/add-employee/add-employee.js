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
    employeeService.addEmployeeAsAdmin('58a49efb04c5864789600a5a', this.employee)
    .then( () => {
      this.employee.name = null;
      this.employee.email = null;
      this.employee.password = null;
      this.employee.admin = false;
      this.employee.shipping = false;
      this.employee.receiving = false;
    });
  };
};
