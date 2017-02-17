'use strict';

require('./_footer-component.scss');

module.exports = {
  template: require('./footer-component.html'),
  controller: ['$log', FooterController],
  controllerAs: 'footerCtrl'
};

function FooterController($log) {
  $log.log('FooterController');

  this.footerDate = new Date().getFullYear();
}
