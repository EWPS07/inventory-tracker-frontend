'use strict';
require('./_employee-settings.scss');

module.exports = {
  template: require('./employee-settings.html'),
  controller: ['$log', EmployeeSettingsController],
  controllerAs: 'employeeSettingsCtrl'
};

function EmployeeSettingsController($log) {
  $log.debug('EmployeeSettingsController');
}
