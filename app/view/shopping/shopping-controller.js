'use strict';
require('./_shopping.scss');

module.exports = ['$log', ShoppingController];

function ShoppingController($log) {
  $log.log('Shopping Controller');
}
