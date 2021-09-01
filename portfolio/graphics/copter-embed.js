// empty shell for students to do their quadcopter
// exercise

// we do enable typescript type checking - see
// https://graphics.cs.wisc.edu/Courses/559-sp2020/pages/typed-js/
// and
// https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files
// @ts-check

export {};

// setup canvas
const canvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("canvas1")
);
const ctx = canvas.getContext("2d");

// parameters of the copter
const bladeLength = 30;
const bladeThickness = 8;
let speed = 6;

// points to draw arms/propellors
let points = [
  [75, 110],
  [-25, 110],
  [-25, -12],
  [75, -12],
];
let offsets = [
  [50, 50, 50, 80],
  [0, 50, 0, 80],
  [0, 20, 0, 50],
  [50, 20, 50, 50],
];

// init vars
let copterX, copterY, mouseX, mouseY, angle, dx, dy, distance, time;
copterX = copterY = mouseX = mouseY = angle = dx = dy = distance = time = 0;

function drawCopter(time, colors) {
  ctx.save();
  ctx.fillStyle = colors[0];

  // draw the arms
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(points[i][0], points[i][1]);
    ctx.lineTo(offsets[i][0], offsets[i][1]);
    ctx.lineTo(offsets[i][2], offsets[i][3]);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(points[i][0], points[i][1], 10, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  }

  // draw the body
  ctx.fillStyle = colors[1];
  ctx.beginPath();
  ctx.moveTo(5, 0);
  ctx.lineTo(45, 0);
  ctx.lineTo(50, 20);
  ctx.lineTo(50, 80);
  ctx.lineTo(45, 100);
  ctx.quadraticCurveTo(25, 110, 5, 100);
  ctx.lineTo(0, 80);
  ctx.lineTo(0, 20);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // draw the propellors
  let count = 0;
  points.forEach((point) => {
    ctx.save();
    ctx.translate(point[0], point[1]);

    // make it so back propellors are slower than back
    if (count == 2) time *= 0.5;

    // draw the propellers
    ctx.rotate(time);
    for (let blades = 0; blades < 4; blades++) {
      ctx.fillStyle = colors[2];
      ctx.fillRect(0, -bladeThickness / 2, bladeLength, bladeThickness);
      ctx.rotate(Math.PI / 2);
    }
    ctx.restore();
    count++;
  });

  ctx.restore();
  ctx.restore();
  ctx.restore();
}

function loop() {
  time = performance.now();

  // Create a linear gradient
  let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

  // Add three color stops
  gradient.addColorStop(0, "#190098");
  gradient.addColorStop(0.5, "#51145C");
  gradient.addColorStop(1, "#BE2F0C");

  // Set the fill style and draw a rectangle
  ctx.fillStyle = gradient;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  // get the distance between the mouse and the copter
  // move in 1/8 increments to smooth out movement
  dx = (mouseX - copterX) * 0.125;
  dy = (mouseY - copterY) * 0.125;

  // determine distance
  distance = Math.sqrt(dx * dx + dy * dy);
  // set max distance to 4 pixels
  if (distance > 4) {
    dx *= 4 / distance;
    dy *= 4 / distance;
  }

  // move the copter
  copterX += dx;
  copterY += dy;

  // draw the following copter
  ctx.save();
  ctx.translate(copterX, copterY - 10);
  ctx.rotate(-Math.PI / 2); // adjust for starting time
  ctx.rotate(angle);
  drawCopter(time / 100, ["grey", "#CB3F48", "black"]);

  // draw circling copter
  ctx.save();
  ctx.translate(300, 300);
  ctx.rotate(
    (((2 * Math.PI) / speed) * time) / (speed * 100) +
      (((2 * Math.PI) / (speed * 1000)) * time) / (speed * 10)
  ); // rotate while keeping faced forward
  ctx.translate(150, 0);
  ctx.scale(0.75, 0.75);
  drawCopter(time / 100, ["orange", "grey", "black"]);

  ctx.restore();
  ctx.restore();

  window.requestAnimationFrame(loop);
}

// listener for mouse move to control following copter
canvas.addEventListener("mousemove", function (e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
  dx = e.pageX - canvas.width / 2;
  dy = e.pageY - canvas.height / 2;
  angle = Math.atan2(dy, dx);
});
loop();
