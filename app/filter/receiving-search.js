'use strict';

module.exports = function() {
  return function(arr, input) {
    if (!input) return arr;
    return arr.filter(ele => ele.receiving === true);
  };
};
