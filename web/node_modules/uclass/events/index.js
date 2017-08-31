"use strict";

var Class = require('../');
var guid  = require('mout/random/guid');
var forIn  = require('mout/object/forIn');

var EventEmitter = new Class({
  Binds : ['on', 'off', 'once', 'emit'],

  callbacks : {},

  initialize : function() {
    var self = this;
    this.addEvent = this.on;
    this.removeListener = this.off;
    this.removeAllListeners = this.off;
    this.fireEvent = this.emit;
  },

  emit:function(event, payload){
    if(!this.callbacks[event])
      return;

    var args = Array.prototype.slice.call(arguments, 1);

    forIn(this.callbacks[event], function(callback){
      callback.apply(null, args);
    });
  },


  on:function(event, callback){
    if(typeof callback != "function")
      return console.log("you try to register a non function in " , event)
    if(!this.callbacks[event])
      this.callbacks[event] = {};
    this.callbacks[event][guid()] = callback;
  },

  once:function(event, callback){
    var self = this;
    var once = function(){
      self.off(event, once);
      self.off(event, callback);
    };

    this.on(event, callback);
    this.on(event, once);
  },

  off:function(event, callback){
    if(!event)
      this.callbacks = {};
    else if(!callback)
      this.callbacks[event] = {};
    else forIn(this.callbacks[event] || {}, function(v, k) {
      if(v == callback)
        delete this.callbacks[event][k];
    }, this);
  },
});

module.exports = EventEmitter;