
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var result = window.location.search.substr(1).match(reg);
    if (result!=null) {
        return result[2];
    } else {
        return null;
    };
}

function initDeviceView(canvas, width, height){
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.style.backgroundColor = '#B0C4DE';
    canvas.style.position = 'absolute';
    canvas.style.zIndex = 0;

    var cursorCanvas = document.createElement("canvas");
    cursorCanvas.id = 'qCursorCanvas';
    cursorCanvas.style.width = width + 'px';
    cursorCanvas.style.height = height + 'px';
    cursorCanvas.width = width;
    cursorCanvas.height = height;
    cursorCanvas.style.position = 'absolute';
    cursorCanvas.style.zIndex = 1;


    var div = document.createElement('div');
    div.style.width = width + 'px';
    div.style.height = height + 'px';
    div.style.position = 'relative';
    div.id = 'qDeviceController';
    div.appendChild(canvas);
    div.appendChild(cursorCanvas);

    function add3MainMenu() {
        var div2 = document.createElement('div');
        div2.style.align = 'center';
        div2.style.position = 'relative';
        div2.style.top =  height + 'px';

        var back = document.createElement("span");
        back.id = 'qDeviceBack';
        back.style.width = 90 + 'px';
        back.style.fontSize = 20 + 'px';
        back.style.textAlign = 'center';
        back.className = 'glyphicon glyphicon-circle-arrow-left';
        div2.appendChild(back);

        var home = document.createElement("span");
        home.id = 'qDeviceHome';
        home.style.width = 90 + 'px';
        home.style.fontSize = 20 + 'px';
        home.style.textAlign = 'center';
        home.className = 'glyphicon glyphicon-home';
        div2.appendChild(home);

        var menu = document.createElement("span");
        menu.id = 'qDeviceMenu';
        menu.style.width = 90 + 'px';
        menu.style.fontSize = 20 + 'px';
        menu.style.textAlign = 'center';
        menu.className = 'glyphicon glyphicon-tasks';
        //menu.style.color = 'blue'
        div2.appendChild(menu);
        return div2;
    }

    var div2 = add3MainMenu();
    div.appendChild(div2);

    document.body.appendChild(div);
}