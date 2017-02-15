'use strict';

module.exports = function() {
  return function(arr, input) {
    if (!input) return arr;
    return arr.filter(ele => new RegExp('.*' + input.toLowerCase().split('').join('.*') + '.*').test(ele.name.toLowerCase()));
  };
};
