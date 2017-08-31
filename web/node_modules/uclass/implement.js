"use strict";

var verbs = /^Implements|Extends|Binds$/

module.exports = function(ctx, obj){
  for(var key in obj) {
    if(key.match(verbs)) continue;
    if((typeof obj[key] == 'function') && obj[key].$static)
      ctx[key] = obj[key];
    else
      ctx.prototype[key] = obj[key];
  }
  return ctx;
}