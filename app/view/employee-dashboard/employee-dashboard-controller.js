'use strict';

require('./_employee-dashboard.scss');

module.exports = ['$log', '$rootScope', 'employeeService', EmployeeDashboardController];

function EmployeeDashboardController($log, $rootScope, employeeService) {
    $log.debug('EmployeeDashboardController');

    this.employees = [];

    this.fetchEmployees = function() {
        // HARD-CODED STORE ID PASSED IN FOR NOW TO TEST VIEW
        // TODO: build out method to populate fetchEmployees with store id.
        employeeService.fetchEmployees('58a49efb04c5864789600a5a')
        .then( employees => {
            this.employees = employees;
            this.currentEmployee = employees[0];
        });
    };

    this.employeeDeleteDone = function(employee) {
        if (this.currentEmployee._id === employee._id) {
            this.currentEmployee = null;
        }
    };

    this.fetchEmployees();

    $rootScope.$on('$locationChangeSuccess', () => this.fetchEmployees());
};
