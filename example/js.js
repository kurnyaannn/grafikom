var xhover = document.querySelector("#xhover");
var yhover = document.querySelector("#yhover");
var x1 = document.querySelector("#x1");
var y1 = document.querySelector("#y1");
var x2 = document.querySelector("#x2");
var y2 = document.querySelector("#y2");
var smooth = document.querySelector("#smooth");
var clear = document.querySelector("#clear");
var canvas = document.getElementById("canvas");
var red = document.getElementById("red");
var green = document.getElementById("green");
var blue = document.getElementById("blue");
var boxX = document.getElementById("boxX");
var boxY = document.getElementById("boxY");
var ctx = canvas.getContext("2d");
var algSelect = document.querySelector('input[name="algSelect[]"]');
ctx.mozImageSmoothingEnabled = smooth.checked;
ctx.webkitImageSmoothingEnabled = smooth.checked;
ctx.msImageSmoothingEnabled = smooth.checked;
ctx.imageSmoothingEnabled = smooth.checked;
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
  //ctx.clearRect(0, 0, 300, 300);
  ctx.strokeStyle =
    "rgb(" + red.value + "," + green.value + "," + blue.value + ")";
  //ctx.strokeStyle = "rgb(255,0,0)";
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
  else if (algSelected === "CohenS") CohenS(x1, y1, x2, y2);
  else if (algSelected === "LiangB") LiangB(x1, y1, x2, y2);
  else if (algSelected === "Circunferencia") Circunferencia(x1, y1, x2, y2);
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
  // calculate dx & dy
  dx = x2 - x1;
  dy = y2 - y1;

  // calculate steps required for generating pixels
  steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);

  // calculate increment in x & y for each steps
  Xinc = dx / steps;
  Yinc = dy / steps;

  // Put pixel for each step
  X = x1;
  Y = y1;
  for (i = 0; i <= steps; i++) {
    drawPixel(X, Y); // put pixel at (X,Y)
    X += Xinc; // increment in x at each step
    Y += Yinc; // increment in y at each step
  }
};

var CohenS = (x, y, x1, y1) => {
  var aceita = false; // define se existe algo para visualizar
  var feito = false; // define se calculos foram finalizados
  var c1;
  var c2;
  var xint = 0;
  var yint = 0;
  var xmin = x;
  var xmax = x1;
  var ymin = y;
  var ymax = y1;
  var cfora;

  while (!feito) {
    c1 = obtemCodigo(x, y, xmin, xmax, ymin, ymax);
    c2 = obtemCodigo(x1, y1, xmin, xmax, ymin, ymax);
    if (c1 === 0 && c2 === 0) {
      aceita = true;
      feito = true;
    } else if ((c1 & c2) !== 0) feito = true;
    else {
      if (c1 !== 0) cfora = c1;
      else cfora = c2;

      if ((cfora & 1) == 1) {
        // esquerda
        xint = xmin;
        yint = y + (y1 - y) * ((xmin - x) / (x1 - x));
      } else if ((cfora & 2) == 2) {
        // direita
        xint = xmax;
        yint = y + (y1 - y) * ((xmax - x) / (x1 - x));
      } else if ((cfora & 4) == 4) {
        // inferior
        yint = ymin;
        xint = x + (x1 - x) * ((ymin - y) / (y1 - y));
      } else if ((cfora & 4) == 4) {
        // superior
        yint = ymax;
        xint = x + (x1 - x) * ((ymax - y) / (y1 - y));
      }

      if (c1 == cfora) {
        x = xint;
        y = yint;
      } else {
        x1 = xint;
        y1 = xint;
      }
    }
  }
  if (aceita) Bresenham(x, y, x1, y1);
};

var obtemCodigo = (x, y, xmin, xmax, ymin, ymax) => {
  var codigo = 0;
  if (x < xmin) codigo++;
  if (x > xmax) codigo += 2;
  if (y < ymin) codigo += 4;
  if (y > ymax) codigo += 8;
  return codigo;
};

var LiangB = (x, y, x1, y1) => {
  var xmin = x;
  var xmax = x1;
  var ymin = y;
  var ymax = y1;
  var dx = x1 - x;
  var dy = y1 - x;
  var u1 = 0,
    u2 = 1;

  if (clipTest(-dx, x - xmin, u1, u2)); // esquerda
  if (clipTest(dx, x - xmax, u1, u2)); // direita
  if (clipTest(-dy, y - ymin, u1, u2)); // inferior
  if (clipTest(dy, y - ymax, u1, u2)); // inferior
  {
    if (u2 < 1) {
      x1 = x + parseInt(dx * u2);
      y1 = y + parseInt(dy * u2);
    }

    if (u1 > 0) {
      x1 = x + parseInt(dx * u1);
      y1 = y + parseInt(dy * u1);
    }

    Bresenham(x, y, x1, y1);
  }
};

var clipTest = (p, q, u1, u2) => {
  var result = true;
  var r;

  if (p < 0) {
    r = q / p;
    if (r > u2) result = false;
    else if (p > u2) u1 = r;
  } else if (p > 0) {
    r = q / p;
    if (r < u1) result = false;
    else if (r < u2) u2 = r;
  } else if (q < 0) result = false;
  return result;
};

var Circunferencia = (x1, y1, x2, y2) => {
  r = parseInt(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(x2 - x1, 2)));
  x = 0;
  y = r;
  p = 1 - r;
  drawPixel(x1 + x, y1 + y);
  drawPixel(x1 - x, y1 + y);
  drawPixel(x1 + x, y1 - y);
  drawPixel(x1 - x, y1 - y);
  drawPixel(x1 + y, y1 + x);
  drawPixel(x1 - y, y1 + x);
  drawPixel(x1 + y, y1 - x);
  drawPixel(x1 - y, y1 - x);
  while (x < y) {
    x++;
    if (p < 0) p += 2 * x + 1;
    else {
      y--;
      p += 2 * (x - y) + 1;
    }
    drawPixel(x1 + x, y1 + y);
    drawPixel(x1 - x, y1 + y);
    drawPixel(x1 + x, y1 - y);
    drawPixel(x1 - x, y1 - y);
    drawPixel(x1 + y, y1 + x);
    drawPixel(x1 - y, y1 + x);
    drawPixel(x1 + y, y1 - x);
    drawPixel(x1 - y, y1 - x);
  }
};

var Translation = () => {
  x1.innerHTML = parseInt(x1.innerHTML) + parseInt(boxX.value);
  y1.innerHTML = parseInt(y1.innerHTML) + parseInt(boxY.value);
  x2.innerHTML = parseInt(x2.innerHTML) + parseInt(boxX.value);
  y2.innerHTML = parseInt(y2.innerHTML) + parseInt(boxY.value);
  DDA(parseInt(x1.innerHTML),
      parseInt(y1.innerHTML),
      parseInt(x2.innerHTML),
      parseInt(y2.innerHTML));
};

var Scale = () => {
  x1.innerHTML = parseInt(x1.innerHTML) * parseFloat(boxX.value);
  y1.innerHTML = parseInt(y1.innerHTML) * parseFloat(boxY.value);
  x2.innerHTML = parseInt(x2.innerHTML) * parseFloat(boxX.value);
  y2.innerHTML = parseInt(y2.innerHTML) * parseFloat(boxY.value);
  DDA(parseInt(x1.innerHTML),
      parseInt(y1.innerHTML),
      parseInt(x2.innerHTML),
      parseInt(y2.innerHTML));
};