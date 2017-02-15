'use strict';

require('./_settings.scss');

module.exports = ['$log', 'storeService', 'employeeService', 'employeeService', SettingsController];

function SettingsController($log, storeService, employeeService, customerService) {
  $log.debug('SettingsController');

  this.currentStore = storeService.currentStore;
  // this.currentEmployee = employeeService.currentEmployee;
  // this.currentCustomer = customerService.currentCustomer;
  this.currentEmployee = {
    _id: '222222',
    name: 'Jim',
    email: 'jimMail@mail.com',
    address: '666 somestreet where Jim lives'
  };
  // this.currentCustomer = {
  //   _id: '111111111',
  //   name: 'Jane',
  //   email: 'Jane@mail.com',
  //   address: '777 somestreet where Jane lives'
  // };
  this.employeeLoggedIn = true;
  this.customerLoggedIn = false;

  this.updateCustomerInfo = function(user) {
    // customerService.updateCustomer(user, this.currentCustomer._id);
    this.currentCustomer = user;
    $log.log(this.currentCustomer);
    return;
  };

  this.updateEmployeeInfo = function(employeeData) {
    // employeeService.updateEmployee(this.currentStore._id, this.currentEmployee._id, employeeData);
    this.currentEmployee = employeeData;
    $log.log(this.currentEmployee);
    return;
  };
}
