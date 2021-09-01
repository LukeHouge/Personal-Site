// @ts-check
/* jshint -W069, -W141, esversion:6 */
export {}; // null statement to tell VSCode we're doing a module

/**
 * drawing function for box 2
 *
 * draw a picture using curves!
 **/
/* no need for onload - we use defer */

let canvas = document.getElementById("canvas11");
if (!(canvas instanceof HTMLCanvasElement)) throw new Error("Canvas is not HTML Element");
let context = canvas.getContext("2d");

drawBody(context, -70, 600);
drawGuard(context, 70, 720);
drawHead(context, 310, -50);
drawNeck(context, 435, 250);
drawParts(context, 209, 850);

function drawBody(ctx, xoff, yoff) {
  ctx.save();

  ctx.beginPath();
  ctx.fillStyle = "#C20000";
  ctx.translate(xoff, yoff);
  ctx.moveTo(216, 48);
  ctx.bezierCurveTo(171, 70, 212, 140, 219, 168);
  ctx.bezierCurveTo(224, 188, 246, 234, 211, 250);
  ctx.bezierCurveTo(191, 259, 153, 262, 111, 314);
  ctx.bezierCurveTo(102, 326, 58, 422, 210, 461);
  ctx.bezierCurveTo(293, 482, 452, 457, 418, 372);
  ctx.bezierCurveTo(412, 357, 391, 329, 410, 283);
  ctx.bezierCurveTo(416, 269, 473, 217, 483, 202);
  ctx.bezierCurveTo(491, 190, 521, 133, 495, 146);
  ctx.bezierCurveTo(481, 153, 438, 164, 423, 165);
  ctx.bezierCurveTo(404, 166, 368, 165, 349, 162);
  ctx.bezierCurveTo(337, 160, 290, 160, 253, 127);
  ctx.bezierCurveTo(247, 122, 231, 113, 236, 68);
  ctx.bezierCurveTo(238, 53, 223, 41, 216, 48);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawGuard(ctx, xoff, yoff) {
  ctx.save();
  ctx.beginPath();
  ctx.beginPath();
  ctx.fillStyle = "#F8F8FA";
  ctx.translate(xoff, yoff);
  ctx.scale(0.6, 0.6);
  ctx.moveTo(200, 125);
  ctx.bezierCurveTo(189, 143, 216, 188, 196, 237);
  ctx.bezierCurveTo(188, 257, 161, 264, 117, 325);
  ctx.bezierCurveTo(107, 339, 83, 372, 99, 404);
  ctx.bezierCurveTo(106, 417, 138, 435, 155, 429);
  ctx.bezierCurveTo(169, 424, 244, 410, 292, 448);
  ctx.bezierCurveTo(304, 457, 349, 483, 367, 464);
  ctx.bezierCurveTo(388, 441, 362, 338, 371, 307);
  ctx.bezierCurveTo(376, 289, 439, 215, 448, 199);
  ctx.bezierCurveTo(455, 186, 462, 172, 429, 180);
  ctx.bezierCurveTo(358, 198, 332, 177, 318, 168);
  ctx.bezierCurveTo(307, 161, 295, 142, 263, 121);
  ctx.bezierCurveTo(251, 113, 215, 102, 199, 125);
  ctx.fill();
  ctx.restore();
}

function drawNeck(ctx, xoff, yoff) {
  ctx.save();
  var gradient = ctx.createLinearGradient(0, 0, 0, 650);

  // Add color stops
  gradient.addColorStop(0, "#572000");
  gradient.addColorStop(1, "#170B00");

  // Set the fill style and draw a rectangle
  ctx.fillStyle = gradient;

  ctx.translate(xoff, yoff);
  ctx.rotate(20 * (Math.PI / 180));
  ctx.fillRect(0, 0, 75, 650);

  for (let y = 0; y < 650; y += 50) {
    ctx.save();
    ctx.translate(0, y);
    ctx.fillStyle = "#B5B5B4";
    ctx.fillRect(0, 0, 75, 10);
    ctx.restore();
  }

  for (let x = 0; x < 6; x++) {
    ctx.save();
    ctx.fillStyle = "#FFF";
    ctx.fillRect(10 + 10 * x, -50 - 25 * x, 2, 700 + 25 * x);
    ctx.translate(5 + 10 * x, -50 - 25 * x);
    ctx.fillStyle = "#C6C6C6";
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  ctx.restore();
}

function drawParts(ctx, xoff, yoff) {
  ctx.save();
  ctx.translate(xoff, yoff);
  ctx.rotate(20 * (Math.PI / 180));
  context.fillStyle = "#CACAD2";
  ctx.fillRect(0, 0, 90, 30);

  ctx.translate(0, 70);
  context.fillStyle = "#CACAD2";
  ctx.fillRect(0, 0, 90, 30);

  ctx.translate(-20, 20);
  ctx.fillStyle = "#606060";
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, 2 * Math.PI);
  ctx.fill();

  ctx.translate(10, 25);
  ctx.beginPath();
  ctx.arc(0, 0, 7, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}

function drawHead(ctx, xoff, yoff) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(xoff, yoff);
  ctx.rotate(12 * (Math.PI / 180));
  ctx.fillStyle = "#F2C077";
  ctx.moveTo(183, 270);
  ctx.lineTo(173, 221);
  ctx.lineTo(241, 71);
  ctx.bezierCurveTo(248, 58, 300, 69, 285, 102);
  ctx.bezierCurveTo(264, 148, 278, 215, 272, 188);
  ctx.bezierCurveTo(272, 173, 279, 210, 284, 248);
  ctx.bezierCurveTo(286, 263, 257, 280, 260, 279);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
