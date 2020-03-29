var xhover = document.querySelector("#xhover");
var yhover = document.querySelector("#yhover");
var x1 = document.querySelector("#x1");
var y1 = document.querySelector("#y1");
var x2 = document.querySelector("#x2");
var y2 = document.querySelector("#y2");
var clear = document.querySelector("#clear");
var canvas = document.getElementById("canvas");
var boxX = document.getElementById("boxX");
var boxY = document.getElementById("boxY");
var ctx = canvas.getContext("2d");
var algSelect = document.querySelector('input[name="algSelect[]"]');

var algSelected = "DDA";

var printMousePos = e => {
  xhover.innerHTML = e.layerX;
  yhover.innerHTML = e.layerY;
  //drawPixel(e.layerX, e.layerY);
};

var getFirstPoint = e => {
  if (e.type == "mousedown") {
    x1.innerHTML = e.layerX;
    y1.innerHTML = e.layerY;
  } else {
    x2.innerHTML = e.layerX;
    y2.innerHTML = e.layerY;
    useAlgorithm(
      parseInt(x1.innerHTML),
      parseInt(y1.innerHTML),
      parseInt(x2.innerHTML),
      parseInt(y2.innerHTML)
    );
  }
};

var drawPixel = (x, y) => {
  ctx.beginPath();
  ctx.strokeStyle = "rgb(0,0,0)";
  ctx.rect(x, y, 1, 1);
  ctx.stroke();
};
var clearScreen = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
};

var algSelectChange = el => {
  algSelected = el.value;
};

var useAlgorithm = (x1, y1, x2, y2) => {
  if (algSelected === "Bresenham") Bresenham(x1, y1, x2, y2);
  else if (algSelected === "DDA") DDA(x1, y1, x2, y2);
};

canvas.addEventListener("mousemove", printMousePos);
canvas.addEventListener("mousedown", getFirstPoint);
canvas.addEventListener("mouseup", getFirstPoint);
clear.addEventListener("click", clearScreen);

var Bresenham = (x1, y1, x2, y2) => {
  var dx = Math.abs(x2 - x1);
  var sx = x1 < x2 ? 1 : -1;
  var dy = -Math.abs(y2 - y1);
  var sy = y1 < y2 ? 1 : -1;
  var err = dx + dy;
  var e2 = 0; /* error value e_xy */

  while (true) {
    drawPixel(x1, y1);
    if (x1 == x2 && y1 == y2) return;
    e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x1 += sx;
    } /* e_xy+e_x > 0 */
    if (e2 <= dx) {
      err += dx;
      y1 += sy;
    } /* e_xy+e_y < 0 */
  }
};

var DDA = (x1, y1, x2, y2) => {
  // hitung dx & dy
  dx = x2 - x1;
  dy = y2 - y1;

  // hitung steps buat pixel
  steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);

  // hitung increment x & y tiap step
  Xinc = dx / steps;
  Yinc = dy / steps;

  // input pixel tiap langkah
  X = x1;
  Y = y1;
  for (i = 0; i <= steps; i++) {
    drawPixel(X, Y); // put pixel at (X,Y)
    X += Xinc; // increment x tiap step
    Y += Yinc; // increment y tiap step
  }
};

var Create = () => {
  x1.innerHTML = parseInt(boxX1.value);
  y1.innerHTML = parseInt(boxY1.value);
  x2.innerHTML = parseInt(boxX2.value);
  y2.innerHTML = parseInt(boxY2.value);
  DDA(parseInt(x1.innerHTML),
      parseInt(y1.innerHTML),
      parseInt(x2.innerHTML),
      parseInt(y2.innerHTML));
};
