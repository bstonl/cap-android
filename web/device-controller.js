/**
 * Created by djj.deng on 2016/12/2.
 */
var util = require('util');
var Class = require('uclass');
var Options = require('uclass/options');
var TouchEventEmitter = require('./event-emitter')
var Promise = require('bluebird');

// home menu back
var DeviceController = new Class({

    Implements: [Options],

    options: {
        pid: ''
    },
    controlPid: '',

    initialize: function (socket, options) {
        if (options) {
            this.controlPid = options.pid;
            this.deviceId = options.deviceId;
            this.wsAck = options.wsAck;
        }
        this.socket = socket;
        this.eventEmitter = new TouchEventEmitter(this.socket);
        console.log('controlPid:%s', this.controlPid);
    },

    ack2Page: function (state, info) {
        var self = this;
        if (self.wsAck && !self.wsAck.isClosed) {
            try {
                self.wsAck.send(JSON.stringify({
                    action: 'CONTROL',
                    deviceId: self.deviceId,
                    peer: 'server',
                    state: state,
                    info: self.formatInfo(self.deviceId, info)
                }))
            }catch (e){
                console.error('device controller ack2Page error:%s',e);
            }

        }
    },

    formatInfo: function (id, info) {
        return util.format('璁惧Id:%s event:%s x:%s y:%s', id, info.event, info.x, info.y);
    },

    doEvent: function (onevent, event) {
        var self = this;
        onevent.then(function (msg) {
                self.ack2Page('success', {event: event.event, x: event.x, y: event.y});
            })
            .catch(function (err) {
                // todo 鍔犲叆err瀛楁
                console.error('doEnvent '+ err);
                self.ack2Page('error', {event: event.event, x: event.x, y: event.y});
            })
    },

    onClick: function (x, y, time) {
        var self = this;
        self.doEvent(self.eventEmitter.emitClick(time, x, y), {event: 'click', x: x, y: y});
        // this.eventEmitter.emitClick(time, x, y)
        // .then(function(msg){
        //     self.ack2Page('success',{event:'click', x:x, y:y});
        // })
        // .catch(function(err){
        //     self.ack2Page('error',{event:'click', x:x, y:y})
        // })
    },

    onLongClick: function (x, y) {
        var self = this;
        self.doEvent(self.eventEmitter.emitLongClick(x, y), {event: 'longclick', x: x, y: y})
        // return this.eventEmitter.emitLongClick(x, y)
    },

    onDown: function (x, y) {
        // return this.eventEmitter.emitDown(0, x, y)
        var self = this;
        self.doEvent(self.eventEmitter.emitDown(0, x, y), {event: 'touchdown', x: x, y: y})
    },

    onUp: function () {
        // return this.eventEmitter.emitUp(0)
        var self = this;
        self.doEvent(self.eventEmitter.emitUp(0), {event: 'touchup', x: -1, y: -1})
    },

    onMove: function (x, y) {
        // return this.eventEmitter.emitMove(x, y)
        var self = this;
        self.doEvent(self.eventEmitter.emitMove(x, y), {event: 'touchmove', x: x, y: y})
    },

    onHome: function () {
        return this.eventEmitter.emitHome()
    },

    onMenu: function () {
        return this.eventEmitter.emitMenu()
    },

    onBack: function () {
        return this.eventEmitter.emitBack()
    },

})

module.exports = DeviceController