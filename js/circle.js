/** Canvas Here **/
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
ctx.translate(0, 0);
ctx.fillStyle = 'gray'
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

function drawCanvas(){
    var canvas = document.querySelector('canvas');
    if (canvas.getContext){
        var context = canvas.getContext('2d');
        for(var x=1;x<400;x+=20){
            context.moveTo(0, x);
            context.lineTo(400, x);
        }
        for(var y=1; y<400; y+=20){
            context.moveTo(y, 400);
            context.lineTo(y, 0);
        }
        context.strokeStyle='white';
        context.stroke();
    }
}

canvas.addEventListener("mousemove", function (evt) {
    var mousePos = getMousePos(canvas, evt);
    coorX = parseInt(mousePos.x)
    coorY = parseInt(mousePos.y)
    document.getElementById('coorX').innerHTML = coorX;
    document.getElementById('coorY').innerHTML = coorY;
}, false);

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left)-7,
        y: (evt.clientY - rect.top)-7
    };
}

/** Setting Point*/
function setPoint(x, y, edge=1, line_helper=0){        
    if(line_helper){
        x_position = x *dot
        y_position = (ctx.canvas.height-dot)-y * dot
    }
    else{
        x_position = (x+center[0]) *dot
        y_position = (ctx.canvas.height-dot)-(y+center[1]) *dot
    }
    if(edge){
        x_position = x_position -dot
        y_position = y_position -dot
        ctx.fillRect(x_position, y_position, dot*3, dot*3)
    }
    else{
        ctx.fillRect(x_position, y_position, dot*2, dot*2)
    }
}

dot_color = 'blue'
line_color = 'red'
const dot = 1

/** Draw Middle Point Here **/
var DrawMidpoint = function(xp, yp){
    center=[xp, yp]
    ctx.fillStyle = line_color
    for(ix=0; ix<ctx.canvas.width/dot; ix++){
        setPoint(ix, center[1], 0, 1)
    }
    for(iy=0; iy<ctx.canvas.height/dot; iy++){
        setPoint(center[0], iy, 0, 1)
    }
    ctx.fillStyle = dot_color
}

/** Draw Circle Shape Here **/
var DrawCircle = function(xc, yc, r){
    p = 1 - r
    x = 0
    y = r
    while(x <= y){
        x++
        if(p<0){
            p += 2 * x + 1
        }else{
            y--
            p += 2 * (x-y) + 1
        }
        setPoint(xc + x, yc + y)
        setPoint(xc - x, yc + y)
        setPoint(xc + x, yc - y)
        setPoint(xc - x, yc - y)
        setPoint(xc + y, yc + x)
        setPoint(xc - y, yc + x)
        setPoint(xc + y, yc - x)
        setPoint(xc - y, yc - x)
    }
}

/** Fungsi User Here **/
function userInput(){
    anchorX = document.getElementById("xa").value;
    xp = parseInt(anchorX)
    anchorY = document.getElementById("ya").value;
    yp = parseInt(anchorY)
    rad = document.getElementById("rad").value;
    r = parseInt(rad)
    DrawMidpoint(xp, yp)
    xc = 0
    yc = 0
    DrawCircle(xc, yc, r)
}

function userReset(){
    window.location = document.URL;
}