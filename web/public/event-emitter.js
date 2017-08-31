/**
 * Created by djj.deng on 2016/12/2.
 */
var Class = require('uclass');
var Options = require('uclass/options');
var util = require('util');
var Promise = require('bluebird');
var EventEmitter;

EventEmitter = new Class({

        initialize: function (socket) {
            this.client = socket
        },

        sendEvent: function (action, time, x, y) {
            var self = this;
            var event = util.format('%s 0 %s %s 50\n', action, x, y);
            return new Promise(function (resolve, reject) {
                if (!self.client || self.client.isClosed) {
                    reject(new Error('socket is closed'));
                }
                setTimeout(function () {
                    try {
                        self.client.write(event);
                        self.client.write('c\n');
                        resolve('ok')
                    } catch (e) {
                        reject(e)
                    }

                }, time)
            });

        },

        emitDown: function (time, x, y) {
            var self = this;
            var event = util.format('d 0 %s %s 50\n', x, y);
            return new Promise(function (resolve, reject) {
                if (!self.client || self.client.isClosed) {
                    reject(new Error('socket is closed'));
                }
                setTimeout(function () {
                    try {
                        self.client.write(event);
                        self.client.write('c\n')
                        resolve('ok')
                    } catch (e) {
                        reject(e)
                    }
                }, time)
            });

        },

        emitUp: function (time) {
            var self = this;
            return new Promise(function (resolve, reject) {
                if (!self.client || self.client.isClosed) {
                    reject(new Error('socket is closed'));
                }
                setTimeout(function () {
                    try {
                        self.client.write('u 0\n');
                        self.client.write('c\n');
                        resolve('ok')
                    } catch (e) {
                        reject(e)
                    }
                }, time)
            });

        },

        emitClick: function (time, x, y) {
            var self = this;
            var event = util.format('d 0 %s %s 50\n', x, y);
            return new Promise(function (resolve, reject) {
                if (!self.client || self.client.isClosed) {
                    reject(new Error('socket is closed'));
                }
                setTimeout(function () {
                    try {
                        self.client.write(event);
                        self.client.write('c\n');
                        self.client.write('u 0\n');
                        self.client.write('c\n');
                        resolve('ok');
                    } catch (e) {
                        reject(e)
                    }
                }, time)
            });

        },

        //http://stackoverflow.com/questions/1930895/how-long-is-the-event-onlongpress-in-the-android
        // 500ms
        emitLongClick: function (x, y) {
            var self = this;
            var event = util.format('d 0 %s %s 50\n', x, y);
            return new Promise(function (resolve, reject) {
                if (!self.client || self.client.isClosed) {
                    reject(new Error('socket is closed'));
                }
                try {
                    self.client.write(event);
                    self.client.write('c\n');
                    setTimeout(function () {
                        self.client.write('u 0\n');
                        self.client.write('c\n')
                        resolve('ok')
                    }, 500)
                } catch (e) {
                    reject(e)
                }
            });

        },

        emitMultiClickAtOneTime: function (points) {
            var self = this;
            return new Promise(function (resolve, reject) {
                if (!self.client || self.client.isClosed) {
                    reject(new Error('socket is closed'));
                }
                try {
                    var contact = 0
                    for (; contact < points.length; contact++) {
                        var point = points.get(contact)
                        var event = util.format('d %s %s %s 50\n', contact, point.x, point.y);
                        self.client.write(event)
                    }
                    self.client.write('c\n');
                    for (; contact >= 0; contact--) {
                        var event = util.format('u %s\n', contact);
                        self.client.write(event)
                    }
                    self.client.write('c\n');
                    resolve('ok');
                } catch (e) {
                    reject(e);
                }
            })

        },

        emitMove: function (x, y) {
            var self = this;
            //self.client.write('m 0 800 1000 70\n')
            var event = util.format('m 0 %s %s 50\n', x, y);
            return new Promise(function (resolve, reject) {
                if (!self.client || self.client.isClosed) {
                    reject(new Error('socket is closed'));
                }
                try {
                    self.client.write(event);
                    self.client.write('c\n');
                    resolve('ok')
                } catch (e) {
                    reject(e)
                }
            });

        },

        emitHome: function () {
            var self = this;
            return new Promise(function (resolve, reject) {
                if (!self.client || self.client.isClosed) {
                    reject(new Error('socket is closed'));
                }
                try {
                    self.client.write('h\n')
                    resolve('ok');
                } catch (e) {
                    reject(e);
                }
            })
        },

        emitMenu: function () {
            var self = this;
            return new Promise(function (resolve, reject) {
                if (!self.client || self.client.isClosed) {
                    reject(new Error('socket is closed'));
                }
                try {
                    self.client.write('e\n');
                    resolve('ok');
                } catch (e) {
                    reject(e);
                }
            });

        },

        emitBack: function () {
            var self = this;
            return new Promise(function (resolve, reject) {
                if (!self.client || self.client.isClosed) {
                    reject(new Error('socket is closed'));
                }
                try {
                    self.client.write('b\n');
                    resolve('ok')
                } catch (e) {
                    reject(e);
                }
            })

        }
    }
);

module.exports = EventEmitter;