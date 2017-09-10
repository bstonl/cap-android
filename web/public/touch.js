"use strict";
/**
 * Created by djj.deng on 2016/10/14.
 */

var eventSender;
var touchWs;
//
//var touchScreenCanvas = document.getElementById('qScreenCanvas');
var backBtn = document.getElementById('qDeviceBack');
var homeBtn = document.getElementById('qDeviceHome');
var menuBtn = document.getElementById('qDeviceMenu');
var cursorCanvas = document.getElementById('qCursorCanvas');


var isPressing = false;

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var result = window.location.search.substr(1).match(reg);
    if (result != null) {
        return result[2];
    } else {
        return null;
    }
    ;
}

function getMousePos(can, evt) {
    var rect = can.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

var deviceId = getQueryString('id');

console.log('deviceId:%s', deviceId);
function drawOnDown(pos) {
    var context = cursorCanvas.getContext('2d');
    if (!context) {
        return
    }
    console.log('down x:%s  y:%s', pos.x,pos.y)

    context.beginPath();
    context.arc(pos.x, pos.y, 12, 0, 2 * Math.PI);
    context.fillStyle = '#BEBEBE'
    context.fill();
    context.closePath();

    context.beginPath();
    context.arc(pos.x, pos.y, 8, 0, 2 * Math.PI);
    context.fillStyle = '#D3D3D3'
    context.fill();
    context.closePath();

    context.beginPath();
    context.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
    context.fillStyle = '#BEBEBE'
    context.fill();
    context.closePath();



}
function onMouseDown(event) {
    //var evtStr = JSON.stringify(event);
    //window.touchWsavc.touchWs.send(evtStr);
    isPressing = true
    var pos = getMousePos(cursorCanvas, event);
    console.log('x:%s y:%s', pos.x, pos.y);
    drawOnDown(pos);
    var evt = new Object();
    evt.type = event.type;
    evt.clientX = pos.x;
    evt.clientY = pos.y;
    evt.deviceId = deviceId;
    sendEvent(evt);
    console.log('onMouseDown');
    event.preventDefault();
}

function drawOnUp() {
    var context = cursorCanvas.getContext('2d');
    if (!context) {
        return
    }
    context.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
}
function onMouseUp(event) {
    isPressing = false
    drawOnUp();
    var pos = getMousePos(cursorCanvas, event);
    var evt = new Object();
    evt.type = event.type;
    evt.clientX = pos.x;
    evt.clientY = pos.y;
    evt.deviceId = deviceId;
    sendEvent(evt);
    console.log('onMouseUp')

}

function drawOnMove(pos) {
    var context = cursorCanvas.getContext('2d');
    if (!context) {
        return
    }
    context.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

    context.beginPath();
    context.arc(pos.x, pos.y, 12, 0, 2 * Math.PI);
    context.fillStyle = '#BEBEBE'
    context.fill();
    context.closePath();

    context.beginPath();
    context.arc(pos.x, pos.y, 8, 0, 2 * Math.PI);
    context.fillStyle = '#D3D3D3'
    context.fill();
    context.closePath();

    context.beginPath();
    context.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
    context.fillStyle = '#BEBEBE'
    context.fill();
    context.closePath();

}
function onMove(event) {
    if (!isPressing) {
        return
    }
    var pos = getMousePos(cursorCanvas, event);
    drawOnMove(pos);
    var evt = new Object();
    evt.type = event.type;
    evt.clientX = pos.x;
    evt.clientY = pos.y;
    evt.deviceId = deviceId;
    sendEvent(evt);
    //console.log('onMove')
    event.preventDefault();
}

function drawOnOut() {
    var context = cursorCanvas.getContext('2d');
    if (!context) {
        return
    }
    context.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
}
function onMoveOut() {
    isPressing = false;
    drawOnOut();
    var evt = new Object();
    evt.type = 'mouseout';
    evt.clientX = 0;
    evt.clientY = 0;
    evt.deviceId = deviceId;
    sendEvent(evt)
    console.log('mouseout')
}

function handleTouch(eventHolder) {
    eventHolder.addEventListener("mousedown", onMouseDown, false);
    eventHolder.addEventListener("mouseup", onMouseUp, false);
    eventHolder.addEventListener("mousemove", onMove, false);
    eventHolder.addEventListener("mouseout", onMoveOut, false)
    console.log("touch initialized.")
}


function onBack() {
    var event = new Object();
    event.type = 'keyevent';
    event.value = 'back'
    event.deviceId = deviceId;
    sendEvent(event)
}

function onHome() {
    var event = new Object();
    event.type = 'keyevent';
    event.value = 'home'
    event.deviceId = deviceId;
    sendEvent(event)
}

function onMenu() {
    var event = new Object();
    event.type = 'keyevent';
    event.value = 'menu'
    event.deviceId = deviceId;
    sendEvent(event)
}

function initMainMenus() {
    backBtn.addEventListener("click", onBack, false);
    homeBtn.addEventListener("click", onHome, false);
    menuBtn.addEventListener("click", onMenu, false)
}

function sendEvent(event) {
    if (touchWs) {
        touchWs.send(JSON.stringify({
            type: event.type,
            x: event.clientX,
            y: event.clientY,
            value: event.value
        }));
    }
}
function initTouch(ws) {
    console.log('type:%s ', typeof cursorCanvas);
    touchWs = ws;
    //var touchScreenCanvas = document.getElementById('qScreenCanvas');
    backBtn = document.getElementById('qDeviceBack');
    homeBtn = document.getElementById('qDeviceHome');
    menuBtn = document.getElementById('qDeviceMenu');
    cursorCanvas = document.getElementById('qCursorCanvas');
    initMainMenus()
    handleTouch(cursorCanvas);
}



