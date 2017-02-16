'use strict';

require('./_add-employee.scss');

// TODO: BUILD OUT ADD EMPLOYEE RECORD COMPONENT
module.exports = {
  template: require('./add-employee.html'),
  controller: ['$log', 'storeService', 'employeeService', AddEmployeeController],
  controllerAs: 'addEmployeeCtrl',
  bindings: {
    store: '<'
  }
};

function AddEmployeeController($log, storeService, employeeService) {
  $log.debug('AddEmployeeController');

  this.employee = {};

  this.addEmployeeRecord = function() {
    $log.log('ADD EMPLOYEE TO STORE:', this.store);
    employeeService.addEmployeeAsAdmin(this.store._id, this.employee)
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
