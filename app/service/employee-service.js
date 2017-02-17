'use strict';

module.exports = ['$q', '$log', '$http', '$window', employeeService];

function employeeService($q, $log, $http, $window) {
  $log.debug('employeeService');

  let service = {};
  let token = null;
  service.employees = [];
  service.currentEmployee = {};

  function setToken(_token) {
    $log.debug('employeeService.setToken()');

    if(!_token) {
      return $q.reject(new Error('no token'));
    };

    $window.localStorage.setItem('token', _token);
    token = _token;
    return $q.resolve(token);
  }

  service.getToken = function() {
    $log.debug('employeeService.getToken');
    if(token) {
      return $q.resolve(token);
    };

    token = $window.localStorage.getItem('token');
    if(token) return $q.resolve(token);
    return $q.reject(new Error('token not found'));
  };

  service.registerEmployee = function(storeID, employee) {
    $log.debug('employeeService.registerEmployee()');

    let url = `${__API_URL__}/api/store/${storeID}/employee`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    return $http.post(url, employee, config)
    .then( response => {
      $log.log('success:', response.data);
      return setToken(response.data.token);
    })
    .catch( err => {
      $log.error('ERROR:', err.message);
      return $q.reject(err);
    });
  };

  service.loginEmployee = function(employee) {
    $log.debug('employeeService.loginEmployee()');

    let url = `${__API_URL__}/api/employee/signin`;
    let base64 = $window.btoa(`${employee.username}:${employee.password}`);
    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`
      }
    };

    return $http.get(url, config)
    .then( response => {
      service.currentEmployee = response.data;
      $log.log('success:', response.data);
      return setToken(response.data.token);
    })
    .catch( err => {
      $log.error('ERROR:', err.message);
      return $q.reject(err);
    });
  };

  service.addEmployeeAsAdmin = function(storeID, employee) {
    $log.debug('employeeService.addEmployeeAsAdmin()');

    return service.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/store/${storeID}/employee`;
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

  service.fetchEmployees = function(storeID) {
    $log.debug('employeeService.fetchEmployees()');

    return service.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/store/${storeID}/employees`;
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

    return service.getToken()
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
      }

      return response.data;
    })
    .catch( err => {
      $log.error('ERROR:', err.message);
      return $q.reject(err);
    });
  };

  service.removeEmployee = function(employeeID) {
    $log.debug('employeeService.removeEmployee()');

    return service.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/employee/${employeeID}`;
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
      }
    })
    .catch( err => {
      $log.error('ERROR:', err.message);
      return $q.reject(err);
    });
  };

  service.logoutEmployee = function() {
    $log.debug('employeeService.logoutEmployee()');

    $window.localStorage.removeItem('token');
    token = null;
    service.currentEmployee = {};
    return $q.resolve();
  };

  return service;
}
