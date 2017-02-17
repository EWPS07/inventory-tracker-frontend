'use strict';

require('./_inventory.scss');

module.exports = ['$log', InventoryController];

function InventoryController($log) {
  $log.log('InventoryController');

  this.showCurrent = function() {
    this.showCurrentFlag = true;
    this.showOutgoingFlag = false;
  };

  this.showOutgoing = function() {
    this.showCurrentFlag = false;
    this.showOutgoingFlag = true;
  };

  this.showCurrent();
}
