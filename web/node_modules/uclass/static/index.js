"use strict";

module.exports = function(func){
  func.$static = true;
  return func;
}
