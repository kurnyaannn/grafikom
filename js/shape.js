var c = document.querySelector('canvas');
var ctx = c.getContext("2d");

function draw() {
    var shapeSelect = document.querySelector('select');
    var shapeSelected = shapeSelect.options[shapeSelect.selectedIndex].text;
    var red = document.getElementById("red");
    var green = document.getElementById("green");
    var blue = document.getElementById("blue");
    ctx.fillStyle = "rgb(" + red.value + "," + green.value + "," + blue.value + ")";
    if (shapeSelected === 'Circle') {
        circle();
    } else if (shapeSelected === 'Rectangle') {
        rectangle();
    } else if (shapeSelected === 'Love') {
        ctx.translate(110, 140);
        love();
    }
    ctx.fill();
}

function circle() {
    ctx.beginPath();
    ctx.arc(200, 200, 100, 0, 2 * Math.PI);
}

function rectangle() {
    ctx.fillRect(100, 150, 200, 100);
}

function love() {
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
}

function userReset() {
    window.location = document.URL;
}
