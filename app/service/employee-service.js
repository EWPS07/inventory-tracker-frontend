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
};