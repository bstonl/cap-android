"use strict";

var hasOwn = require("mout/object/hasOwn");
var create = require("mout/lang/createObject");
var merge  = require("mout/object/merge");
var kindOf = require("mout/lang/kindOf");
var mixIn  = require("mout/object/mixIn");

var implement = require('./implement');
var verbs = /^Implements|Extends|Binds$/




var uClass = function(proto){

  if(kindOf(proto) === "Function") proto = {initialize: proto};

  var superprime = proto.Extends;

  var constructor = (hasOwn(proto, "initialize")) ? proto.initialize : superprime ? superprime : function(){};



  var out = function() {
    var self = this;
      //autobinding takes place here
    if(proto.Binds) proto.Binds.forEach(function(f){
      var original = self[f];
      if(original)
        self[f] = mixIn(self[f].bind(self), original);
    });

      //clone non function/static properties to current instance
    for(var key in out.prototype) {
      var v = out.prototype[key], t = kindOf(v);

      if(key.match(verbs) || t === "Function" || t == "GeneratorFunction")
        continue;

      if(t == "Object")
        self[key] = merge({}, self[key]); //create(null, self[key]);
      else if(t == "Array")
        self[key] = v.slice(); //clone ??
      else
        self[key] = v;
    }

    if(proto.Implements)
      proto.Implements.forEach(function(Mixin){
        Mixin.call(self);
      });




    constructor.apply(this, arguments);
  }


  if (superprime) {
    // inherit from superprime
      var superproto = superprime.prototype;
      if(superproto.Binds)
        proto.Binds = (proto.Binds || []).concat(superproto.Binds);

      if(superproto.Implements)
        proto.Implements = (proto.Implements || []).concat(superproto.Implements);

      var cproto = out.prototype = create(superproto);
      // setting constructor.parent to superprime.prototype
      // because it's the shortest possible absolute reference
      out.parent = superproto;
      cproto.constructor = out

  }


 if(proto.Implements) {
    if (kindOf(proto.Implements) !== "Array")
      proto.Implements = [proto.Implements];
    proto.Implements.forEach(function(Mixin){
      implement(out, Mixin.prototype);
    });
  }

  implement(out, proto);
  if(proto.Binds)
     out.prototype.Binds = proto.Binds;
  if(proto.Implements)
     out.prototype.Implements = proto.Implements;

  return out;
};



module.exports = uClass;