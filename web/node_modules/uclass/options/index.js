"use strict";

var Class = require('../');
var merge = require("mout/object/merge")

var Options = new Class({

  setOptions: function(options){
      var optionsStack = Array.prototype.slice.call(arguments,0),
          tmp = Object.getPrototypeOf(this);
      while(tmp) {
        optionsStack.push(tmp.options);
        tmp = tmp.constructor.parent;
      }
      optionsStack.push({});
      optionsStack.reverse();

      this.options = merge.apply(null, optionsStack)
      return this
  }
});

module.exports = Options;