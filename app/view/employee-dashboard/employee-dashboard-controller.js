'use strict';

require('./_employee-dashboard.scss');

module.exports = ['$log', '$rootScope', 'storeService', 'employeeService', EmployeeDashboardController];

function EmployeeDashboardController($log, $rootScope, storeService, employeeService) {
  $log.debug('EmployeeDashboardController');

  this.employees = [];

  this.fetchEmployees = function() {
    storeService.getStores()
    .then( () => {
      if (storeService.stores) storeService.currentStore = storeService.stores[0];
      $log.log('FIRST STORE:', storeService.currentStore._id);
      this.currentStore = storeService.currentStore;

      employeeService.fetchEmployees(storeService.currentStore._id)
      .then( employees => {
        this.employees = employees;
        this.currentEmployee = employees[0];
      });

      this.allStores = storeService.stores;
      this.currentStoreNumber = this.currentStore.storeNumber;
    });
  };

  this.changeStore = function(storeNumber) {
    $log.log('storeLocationCtrl.changeStore');
    $log.log('CHANGED STORE:', storeService.currentStore._id);
    storeService.currentStore = storeService.stores.find(_store => _store.storeNumber === storeNumber);
    this.currentStore = storeService.currentStore;
    employeeService.fetchEmployees(storeService.currentStore._id)
    .then( employees => {
      this.employees = employees;
      this.currentEmployee = employees[0];
    });

    $log.log(this.currentStore);
  };

  this.employeeDeleteDone = function(employee) {
    if (this.currentEmployee._id === employee._id) {
      this.currentEmployee = null;
    }
  };

  this.fetchEmployees();

  $rootScope.$on('$locationChangeSuccess', () => this.fetchEmployees());
}
