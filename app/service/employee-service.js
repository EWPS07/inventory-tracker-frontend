'use strict';

module.exports = ['$q', '$log', '$http', 'authService', employeeService];

function employeeService($q, $log, $http, authService) {
    $log.debug('employeeService');

    let service = {};
    service.employees = [];

    service.addEmployee = function(employee) {
        $log.debug('employeeService.addEmployee()');

        return authService.getToken()
        .then( token => {
            let url = `${__API_URL__}/api/employee`;
            let config = {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            return $http.post(url, employee, config);
        })
        .then( response => {
            $log.log('sucess: employee added');

            let employee = response.data;
            service.employees.unshift(employee);
            return employee;
        })
        .catch( err => {
            $log.error('ERROR:', err.message);
            return $q.reject(err);
        });
    };

    service.fetchEmployees = function() {
        $log.debug('employeeService.fetchEmployees()');

        return authService.getToken()
        .then( token => {
            let url = `${__API_URL__}/api/employee`;
            let config = {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            return $http.get(url, config);
        })
        .then( response => {
            $log.log('success: employee data retrieved');
            service.employees = response.data;
            return service.employees;
        })
        .catch( err => {
            $log.error('ERROR:', err.message);
            return $q.reject(err);
        });
    };

    service.updateEmployee = function(employeeID, employeeData) {
        $log.debug('employeeService.updateEmployee()');

        return authService.getToken()
        .then( token => {
            let url = `${__API_URL__}/api/employee/${employeeID}`;
            let config = {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            return $http.put(url, employeeData, config);
        })
        .then( response => {
            for (let i = 0; i < service.employees.length; i++) {
                let current = service.employees[i];

                if (current._id === employeeID) {
                    service.employees[i] = response.data;
                    break;
                }
            };

            return response.data;
        })
        .catch( err => {
            $log.error('ERROR:', err.message);
            return $q.reject(err);
        });
    };

    service.removeEmployee = function(employeeID) {
        $log.debug('employeeService.removeEmployee()');

        return authService.getToken()
        .then( token => {
            let url = `${__API_URL__}/api/employee/${employeeID}`
            let config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            return $http.delete(url, config);
        })
        .then( response => {
            for (let i = 0; i < service.employees.length; i++) {
                let current = service.employees[i];

                if (current._id === employeeID) {
                    service.employees.splice(i, 1);
                    break;
                }
            };
        })
        .catch( err => {
            $log.error('ERROR:', err.message);
            return $q.reject(err);
        });
    };

    return service;
};