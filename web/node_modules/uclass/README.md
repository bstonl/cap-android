# Motivation

uclass is a micro class that mimic mootools' base Class.js & Class.Mutator.Bind syntax, with prime's inheritance stack (as in, explicit parent binding). There is no runtime overload as this is just a syntax wrapper around javascript native Prototype.

* As in prime, uclass use mout for javascript utilities.
* As in primish, uclass keep the old "Extends" & "Implements" design/syntax.


# Example

```
var Class  = require('uclass');
var statik = require('uclass/static');

var Ball = new Class({
 Binds:['step'], //force 
  
 color :'red',
 direction:[0,0],
 radius:0,
 position:[0,0],
 
 initialize: function(radius, direction){
   this.radius = radius || 10;
   this.direction = direction || [Math.random()*10, Math.random()*10];
 },
 
 step:function(){
  this.position[0] += this.direction[0];
  this.position[1] += this.direction[1];
 },


 generate : statik( function(radius, position){
    return new Ball(radius, position);
 } ),

});

var ball = new Ball(12);

```


# Api/mixin
Using Implements : [list of traits] you can add method to your class prototype using any native object
```
Implements : [
  require('events').EventEmitter, //for node
  require('uclass/events'),       //for the browser
  require('uclass/options'),      //add setOptions (merge(this.options))
  require('uclass/static'),       //declare a static member
}

```




#License
MIT License style, please distribute & credit me somewhere.
