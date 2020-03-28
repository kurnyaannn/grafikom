/** Canvas Here **/
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'black'
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

function setPoint(x, y, edge=1, line_helper=0){        
    if(line_helper){
        x_position = x *dot
        y_position = (ctx.canvas.height-dot)-y *dot
    }else{
        x_position = (x+center[0]) *dot
        y_position = (ctx.canvas.height-dot)-(y+center[1]) *dot
    }
    if(edge){
    // with +1 dot edge
        x_position = x_position -dot
        y_position = y_position -dot
        ctx.fillRect(x_position, y_position, dot*3, dot*3)
    }else{
    // without edge
        ctx.fillRect(x_position, y_position, dot, dot)
    }
}
dot_color = 'white'
line_color = 'gray'
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