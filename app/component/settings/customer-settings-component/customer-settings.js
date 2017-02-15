'use strict';
require('./_customer-settings.scss');

module.exports = {
  template: require('./customer-settings.html'),
  controller: ['$log', CustomerSettingsController],
  controllerAs: 'customerSettingsCtrl'
};

function CustomerSettingsController($log) {
  $log.debug('CustomerSettingsController');
}
