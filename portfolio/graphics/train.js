/*jshint esversion: 6 */
// @ts-check

// these two things are the main UI code for the train
// students learned about them in last week's workbook
import { draggablePoints } from "./libs/CS559/dragPoints.js";
import { RunCanvas } from "./libs/CS559/runCanvas.js";

// this is a utility that adds a checkbox to the page
// useful for turning features on and off
import { makeCheckbox } from "./libs/CS559/inputHelpers.js";

/**
 * Have the array of control points for the track be a
 * "global" (to the module) variable
 *
 * Note: the control points are stored as Arrays of 2 numbers, rather than
 * as "objects" with an x,y. Because we require a Cardinal Spline (interpolating)
 * the track is defined by a list of points.
 *
 * things are set up with an initial track
 */
/** @type Array<number[]> */
let thePoints = [
  [150, 150],
  [400, 450],
  [450, 450],
  [450, 150],
];

// global arrays
let table = []; // stores the lookup table for distance along track used for arc-length parameterization
let curves = []; // stores the bezier curve control points
let colors = []; // stores colors for the train cars (since randomly generated need to retain)
let smoke = []; // stores smoke puff objects
let scenery = []; // stores tree objects

// global vars
let divisions,
  tension,
  arcLength,
  speed,
  simpleTrack,
  numCars,
  numMade,
  light,
  lightBrightness,
  tieGap,
  sceneryEnable,
  smokeEnable,
  smokeFreq,
  smokeDissipation,
  showPoints,
  width,
  height,
  sceneryInit,
  numScenery;
let count = 0;

// declaring sliders and checkboxes
let arcLengthCheckbox = /** @type {HTMLInputElement} */ (document.getElementById("arcLength"));
let showPointsCheckbox = /** @type {HTMLInputElement} */ (document.getElementById("points"));
let simpleTrackCheckbox = /** @type {HTMLInputElement} */ (document.getElementById("simple"));
let speedSlider = /** @type {HTMLInputElement} */ (document.getElementById("speed"));
let tensionSlider = /** @type {HTMLInputElement} */ (document.getElementById("tension"));
let divisionsSlider = /** @type {HTMLInputElement} */ (document.getElementById("divisions"));
let numCarsSlider = /** @type {HTMLInputElement} */ (document.getElementById("numCars"));
let lightCheckbox = /** @type {HTMLInputElement} */ (document.getElementById("light"));
let lightSlider = /** @type {HTMLInputElement} */ (document.getElementById("lightBrightness"));
let tieGapSlider = /** @type {HTMLInputElement} */ (document.getElementById("tieGap"));
let sceneryCheckbox = /** @type {HTMLInputElement} */ (document.getElementById("scenery"));
let smokeCheckBox = /** @type {HTMLInputElement} */ (document.getElementById("smoke"));
let smokeFreqSlider = /** @type {HTMLInputElement} */ (document.getElementById("smokeFreq"));
let smokeDissipationSlider = /** @type {HTMLInputElement} */ (
  document.getElementById("smokeDissipation")
);
let numScenerySlider = /** @type {HTMLInputElement} */ (document.getElementById("numScenery"));

// init function to grab starting values from sliders / check boxes
function init() {
  simpleTrackCheckbox.checked = true;
  showPointsCheckbox.checked = true;
  lightCheckbox.checked = true;
  smokeCheckBox.checked = true;

  tension = Number(tensionSlider.value);
  speed = Number(speedSlider.value);
  divisions = Number(divisionsSlider.value);
  numCars = Number(numCarsSlider.value);
  lightBrightness = Number(lightSlider.value);
  tieGap = Number(tieGapSlider.value);
  smokeFreq = Number(smokeFreqSlider.value);
  smokeDissipation = Number(smokeDissipationSlider.value);
  tieGap = Number(tieGapSlider.value);
  numScenery = Number(numScenerySlider.value);

  // generate train colors
  for (let i = 0; i < numCars; i++) {
    colors.push(Math.floor(Math.random() * 16777215).toString(16));
  }

  if (arcLengthCheckbox.checked) {
    arcLength = true;
  } else {
    arcLength = false;
  }
  if (showPointsCheckbox.checked) {
    showPoints = true;
  } else {
    showPoints = false;
  }
  if (simpleTrackCheckbox.checked) {
    simpleTrack = true;
  } else {
    simpleTrack = false;
    showPoints = false;
  }
  if (lightCheckbox.checked) {
    light = true;
  } else {
    light = false;
  }
  if (sceneryCheckbox.checked) {
    sceneryEnable = true;
  } else {
    sceneryEnable = false;
  }
  if (smokeCheckBox.checked) {
    smokeEnable = true;
  } else {
    smokeEnable = false;
  }
}

/**
 * Draw function - this is the meat of the operation
 *
 * It's the main thing that needs to be changed
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} param
 */
function draw(canvas, param) {
  let context = canvas.getContext("2d");

  // clear the screen
  context.clearRect(0, 0, canvas.width, canvas.height);
  // if scenery is on, fill with green
  if (sceneryEnable) {
    context.fillStyle = "rgb(122, 194, 77,0.7)";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  // determine the points and control points for the Bezier Curves
  curves = computeCurvePoints(thePoints);

  // now draw the track with Bezier curves from the points generated
  if (simpleTrack) {
    // draw simple track
    drawCurves({ x: thePoints[0][0], y: thePoints[0][1] }, context);
  } else {
    // draw the two offset tracks
    splitCurve(context, 7);
    splitCurve(context, -7);

    // draw rail ties
    drawTies(context);
  }

  // draw the control points
  if (showPoints) {
    context.fillStyle = "red";
    context.strokeStyle = "black";
    thePoints.forEach(function (pt) {
      context.beginPath();
      context.arc(pt[0], pt[1], 5, 0, Math.PI * 2);
      context.closePath();
      context.fill();
    });
  }

  // generate scenery if not done yet
  if (!sceneryInit && sceneryEnable) {
    initScenery();
    sceneryInit = true;
  }
  // draw scenery if enabled
  if (sceneryEnable) {
    scenery.forEach(function (tree) {
      context.fillStyle = "green";
      context.strokeStyle = "black";
      context.beginPath();
      context.arc(tree.x, tree.y, 15, 0, Math.PI * 2);
      context.closePath();
      context.fill();
      context.stroke();
    });
  }

  // draw train
  numMade = 0;
  if (arcLength) {
    // init the arcLength lookup table
    initTable();
    // loop through and make requested number of cars
    numMade = 0;
    for (let i = 0; i < numCars; i++) {
      // determine u position, then normalize with computeArcLength, and draw car
      let u = param + 0.12 * i;
      if (u >= thePoints.length) u -= thePoints.length;
      u = computeArcLength(u);
      drawCar(context, u);
    }
  } else {
    // if arcLength disabled, just make one train without arc length
    numCars = 1;
    drawCar(context, param);
  }
}

// normalizes a position based on arc length
function computeArcLength(u) {
  let p = 0;

  // find the position relative to total distance
  let len = table.length - 1;
  let s = table[len] * (u / thePoints.length);
  if (u == 0) return 0;

  // then determine which u value maps to that distance
  for (let t = 0; t < len; t++) {
    if (table[t] >= s) {
      if (t == 0) {
        return 0;
      }

      // determine the distance in between divisions
      p = (s - table[t - 1]) / (table[t] - table[t - 1]);
      p *= 1 / divisions;
      p += t * (1 / divisions);
      break;
    }
  }
  return p;
}

// init the lookup table for arc length distances
function initTable() {
  table = [];
  let totDist = 0;
  for (let i = 0; i < thePoints.length; i += 1 / divisions) {
    let round = Math.round(divisions * i) / divisions; // round X to tenths
    if (round + 1 / divisions >= thePoints.length) {
      round = 0;
    }
    let pointA = computePoint(round, curves);
    let pointB = computePoint(round + 1 / divisions, curves);

    let a = pointA.Px - pointB.Px;
    let b = pointA.Py - pointB.Py;

    let c = Math.sqrt(a * a + b * b);
    totDist += c;
    totDist = Math.round(divisions * totDist) / divisions;
    table.push(totDist);
  }
}

// split the curve into many linear segments at an offset to approximate the actual curve,
// since impossible to actually offset a bezier without degree 10. Splits into number of
// linear segments equal to divisions var, set by a slider in the UI
function splitCurve(ctx, offset) {
  // determine starting point
  let p1 = computePoint(0, curves);
  let x0 = p1.Px;
  let y0 = p1.Py;
  let m = Math.atan2(p1.Dy, p1.Dx);

  // move to the start point and begin path
  ctx.save();
  ctx.strokeStyle = "#AAB2AE";
  ctx.lineWidth = 3;
  ctx.translate(x0, y0);
  ctx.rotate(m);
  ctx.beginPath();
  ctx.moveTo(0, offset);

  // undo the transforms (since we do not want to loose path cannot do context.restore())
  ctx.rotate(-m);
  ctx.translate(-x0, -y0);

  // draw the rest of the points
  for (let i = 0; i < thePoints.length; i += 1 / divisions) {
    p1 = computePoint(i, curves);
    i = i + 1 / divisions >= thePoints.length ? 0 : i + 1 / divisions;
    x0 = p1.Px;
    y0 = p1.Py;
    m = Math.atan2(p1.Dy, p1.Dx);

    ctx.save();
    ctx.translate(x0, y0);
    ctx.rotate(m);
    ctx.lineTo(0, offset);
    ctx.restore();
  }
  ctx.stroke();
  ctx.restore();
}

// draws rail ties at a distance of tieGap (set by slider) uniformly around the
// track, perpendicular to the track itself. Requires arc-length
function drawTies(ctx) {
  for (let i = 0; i < table.length - 1; i += tieGap) {
    let u = computeArcLength(i);

    ctx.save();

    let point = computePoint(u, curves);
    ctx.translate(point.Px, point.Py);
    ctx.rotate(Math.atan2(point.Dy, point.Dx));

    ctx.fillStyle = "#D7800F";
    ctx.strokeStyle = "#795A01";
    ctx.fillRect(0, -10, 5, 20);

    ctx.restore();
  }
}

// given a list of points calculates the start/end and control points for
// cardinal splines  to interpolate those points, and returns new list of points
function computeCurvePoints(points) {
  let destination = [];
  let len = points.length - 1;
  for (let i = 0; i <= len; i++) {
    let p0 = i - 1 >= 0 ? points[i - 1] : points[len];
    let p1 = points[i];
    let p2 = i + 1 <= len ? points[i + 1] : points[i + 1 - (len + 1)];
    let p3 = i + 2 <= len ? points[i + 2] : points[i + 2 - (len + 1)];

    let cp1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension;
    let cp1y = p1[1] + ((p2[1] - p0[1]) / 6) * tension;

    let cp2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension;
    let cp2y = p2[1] - ((p3[1] - p1[1]) / 6) * tension;

    destination.push({
      cp1: { x: cp1x, y: cp1y },
      cp2: { x: cp2x, y: cp2y },
      end: { x: p2[0], y: p2[1] },
    });
  }
  return destination;
}

// given a list of points and context to draw on, loop
// through and draw Bezier cubic curves through all the points
function drawCurves(start, ctx) {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  curves.forEach(function (curve) {
    ctx.bezierCurveTo(curve.cp1.x, curve.cp1.y, curve.cp2.x, curve.cp2.y, curve.end.x, curve.end.y);
  });
  ctx.lineWidth = 3;
  ctx.stroke();
}

// given a u value from 0 to numPoints, compute the x,y location
// and tangent direction on the curve corresponding to the u value
function computePoint(u, curvePoints) {
  // get the segment currently in by rounding slider value down
  let seg = Math.floor(u);

  // get the curve u value is in from list of curve points
  let curve = curvePoints[seg];

  // determine the previous segment
  let lastCurve = seg - 1 >= 0 ? curvePoints[seg - 1] : curvePoints[curvePoints.length - 1];

  // just get the fractional component from u value (u from 0-1)
  u -= seg;
  let x = parameterizeBezier(u, lastCurve.end.x, curve.cp1.x, curve.cp2.x, curve.end.x);
  let y = parameterizeBezier(u, lastCurve.end.y, curve.cp1.y, curve.cp2.y, curve.end.y);

  return { Dx: x.tangent, Dy: y.tangent, Px: x.position, Py: y.position };
}

// given a u position and points for a curve, compute the
// position and tangent by parameterizing the Bezier
function parameterizeBezier(u, p0, cp0, cp1, p1) {
  let P =
    Math.pow(1 - u, 3) * p0 +
    3 * u * Math.pow(1 - u, 2) * cp0 +
    3 * u * u * (1 - u) * cp1 +
    u * u * u * p1;
  let D =
    -3 * Math.pow(1 - u, 2) * p0 +
    3 * Math.pow(1 - u, 2) * cp0 -
    6 * u * (1 - u) * cp0 -
    3 * u * u * cp1 +
    6 * u * (1 - u) * cp1 +
    3 * u * u * p1;
  return { position: P, tangent: D };
}

// draws a train at given position u along a track where
// 0 <= u <= numPoints
function drawCar(ctx, u) {
  ctx.save();

  let point = computePoint(u, curves);
  ctx.translate(point.Px, point.Py);
  ctx.rotate(Math.atan2(point.Dy, point.Dx));
  ctx.fillStyle = "#" + colors[numMade];

  // draw the train body
  ctx.fillRect(-10, -8, 30, 15);

  // draw a connecting joint if not the end
  if (numMade != 0) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(-13, 0, 5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  // draw the light
  if (numMade == numCars - 1 && light) {
    ctx.fillStyle = `rgb(255, 255, 0, ${lightBrightness})`;
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(100 * lightBrightness, -50 * lightBrightness);
    ctx.lineTo(100 * lightBrightness, 50 * lightBrightness);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // draw the smoke
  if (smokeEnable && numMade == numCars - 1) {
    // use global counter to only draw smoke at an interval controlled by smokeFreq
    count++;
    if (count % smokeFreq == 0) smoke.push({ x: point.Px, y: point.Py, dur: 0 });

    // draw all the smoke puffs
    smoke.forEach(function (puff) {
      ctx.save();
      ctx.translate(puff.x, puff.y);
      ctx.beginPath();

      // make the puff fade out over time
      ctx.fillStyle = `rgb(128, 128, 128,${0.8 - puff.dur})`;

      // make the puff grow over time
      let radius = 5 + (puff.dur / 1) * 60;
      ctx.arc(0, 0, radius, 0, Math.PI * 2);

      // remove from list if past it's duration
      puff.dur += smokeDissipation;
      if (puff.dur >= 1) delete smoke[smoke.indexOf(puff)];

      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  }

  numMade++;
}

// generate a list of trees at random places
function initScenery() {
  scenery = [];

  // get x and y positions for the requested amount of trees
  for (let i = 0; i < numScenery; i++) {
    let x = 0;
    let y = 0;

    // keep getting random positions until not in track
    do {
      x = getRndInteger(0, width);
      y = getRndInteger(0, height);
    } while (byTrack(x, y));

    // add the tree to the list
    scenery.push({ x: x, y: y });
  }
}

// checks if a point is within 40px radius of the track
function byTrack(x, y) {
  // check for each 1/10th of the track (should be decently accurate-- probably not worth more computation)
  for (let i = 0; i < thePoints.length; i += 1 / 10) {
    let point = computePoint(i, curves);
    let a = point.Px;
    let b = point.Py;
    let dist = Math.sqrt(Math.pow(a - x, 2) + Math.pow(b - y, 2));

    // check if too close
    let r = 40;
    if (dist < r) {
      return true;
    }
  }

  // none are too close
  return false;
}

// helper function to generate a random int
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Initialization code - sets up the UI and start the train
 */
{
  let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
  let context = canvas.getContext("2d");

  // we need the slider for the draw function, but we need the draw function
  // to create the slider - so create a variable and we'll change it later
  let slider; // = undefined;

  // anytime we click and release the mouse, regenerate the list of trees to account
  // for a possible movement in the track
  canvas.addEventListener("mouseup", function (e) {
    sceneryInit = false;
  });
  width = canvas.width;
  height = canvas.height;

  // call init function to set things up
  init();

  // handlers for the checkboxes / sliders
  arcLengthCheckbox.onchange = function () {
    if (arcLengthCheckbox.checked) {
      arcLength = true;
    } else {
      arcLength = false;
    }
    wrapDraw();
  };
  simpleTrackCheckbox.onchange = function () {
    if (simpleTrackCheckbox.checked) {
      simpleTrack = true;
    } else {
      simpleTrack = false;
      arcLengthCheckbox.checked = true;
      arcLength = true;
    }

    wrapDraw();
  };
  lightCheckbox.onchange = function () {
    if (lightCheckbox.checked) {
      light = true;
    } else {
      light = false;
    }
    wrapDraw();
  };
  sceneryCheckbox.onchange = function () {
    if (sceneryCheckbox.checked) {
      sceneryEnable = true;
    } else {
      sceneryEnable = false;
    }
    wrapDraw();
  };
  smokeCheckBox.onchange = function () {
    if (smokeCheckBox.checked) {
      smokeEnable = true;
    } else {
      smokeEnable = false;
    }
    wrapDraw();
  };
  showPointsCheckbox.onchange = function () {
    if (showPointsCheckbox.checked) {
      showPoints = true;
    } else {
      showPoints = false;
    }
    wrapDraw();
  };
  tensionSlider.oninput = function () {
    tension = Number(tensionSlider.value);
    initScenery();
    wrapDraw();
  };
  divisionsSlider.oninput = function () {
    divisions = Number(divisionsSlider.value);
    setNumPoints();
    simpleTrack = true;
    wrapDraw();
    simpleTrack = false;
    wrapDraw();
  };
  speedSlider.oninput = function () {
    speed = Number(speedSlider.value);
    setNumPoints();
  };
  numCarsSlider.oninput = function () {
    numCars = Number(numCarsSlider.value);

    // generate train colors
    for (let i = 0; i < numCars; i++) {
      colors.push(Math.floor(Math.random() * 16777215).toString(16));
    }

    wrapDraw();
  };
  lightSlider.oninput = function () {
    lightBrightness = Number(lightSlider.value);
    wrapDraw();
  };
  tieGapSlider.oninput = function () {
    tieGap = Number(tieGapSlider.value);
    wrapDraw();
  };
  smokeFreqSlider.oninput = function () {
    smokeFreq = Number(smokeFreqSlider.value);
    wrapDraw();
  };
  smokeDissipationSlider.oninput = function () {
    smokeDissipation = Number(smokeDissipationSlider.value);
    wrapDraw();
  };
  numScenerySlider.oninput = function () {
    initScenery();
    numScenery = Number(numScenerySlider.value);
    wrapDraw();
  };

  // note: we wrap the draw call so we can pass the right arguments
  function wrapDraw() {
    // do modular arithmetic since the end of the track should be the beginning

    draw(canvas, Number(slider.value) % thePoints.length);
  }
  // create a UI
  let runcavas = new RunCanvas(canvas, wrapDraw);
  // now we can connect the draw function correctly
  slider = runcavas.range;

  // note: if you add these features, uncomment the lines for the checkboxes
  // in your code, you can test if the checkbox is checked by something like:
  // document.getElementById("simple-track").checked
  // in your drawing code
  //
  // lines to uncomment to make checkboxes
  // makeCheckbox("simple-track",false);
  // makeCheckbox("arc-length",true);
  // makeCheckbox("bspline",false);

  // helper function - set the slider to have max = # of control points
  function setNumPoints() {
    runcavas.setupSlider(0, thePoints.length, speed);
  }

  setNumPoints();
  runcavas.setValue(0);

  // add the point dragging UI
  draggablePoints(canvas, thePoints, wrapDraw, 10, setNumPoints);
}
