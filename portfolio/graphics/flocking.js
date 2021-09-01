/**
 * 04-05-01.js - a simple JavaScript file that gets loaded with
 * page 5 of Workbook 4 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020, February 2021
 *
 */

// @ts-check
/* jshint -W069, esversion:6 */

/**
 * If you want to read up on JavaScript classes,
 * see the tutorial on the class website:
 *
 * https://graphics.cs.wisc.edu/Courses/559-sp2021/tutorials/oop-in-js-1/
 */
class Boid {
  /**
   *
   * @param {number} x            - initial X position
   * @param {number} y            - initial Y position
   * @param {number} vx           - initial X velocity
   * @param {number} vy           - initial Y velocity
   * @param {number} altColor     - timer for alt color
   */
  constructor(x, y, vx = 1, vy = 0, altColor = 0) {
    this.x = x; // boid x position
    this.y = y; // boid y position
    this.vx = vx; // boid x velocity
    this.vy = vy; // boid y velocity
    this.altColor = altColor; // field to store how many frames left the boid should be the alternate color
  }
  /**
   * Draw the Boid
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    context.save();

    // if boid should be alternate color set the fill style and decrement count
    if (this.altColor != 0) {
      context.fillStyle = "red";
      this.altColor--;
    }

    // transform to the location of boid and draw triangle
    context.translate(this.x, this.y);
    context.rotate(-Math.atan2(this.vx, this.vy));
    context.beginPath();
    context.moveTo(0, width);
    context.lineTo(width, 0);
    context.lineTo(-width, 0);

    // Check if any boids overlapping
    if (checkCollisions) {
      for (let i = 0; i < theBoids.length; i++) {
        for (let j = 0; j < theBoids.length; j++) {
          if (i != j) {
            let boid1 = theBoids[i];
            let boid2 = theBoids[j];
            if (Math.abs(boid1.x - boid2.x) <= width) {
              if (Math.abs(boid1.y - boid2.y) <= width) {
                // if boids overlapping flip directions and update position
                boid1.vy *= -1;
                boid1.y += boid1.vy * speed;
                boid1.vx *= -1;
                boid1.x += boid1.vx * speed;
                boid2.vy *= -1;
                boid2.y += boid2.vy * speed;
                boid2.vx *= -1;
                boid2.x += boid2.vx * speed;

                // set them to alternate color
                boid2.altColor = altColorFrames;
                boid1.altColor = altColorFrames;
              }
            }
          }
        }
      }
    }

    context.fill();
    context.restore();
  }

  /**
   * Perform the "steering" behavior -
   * This function should update the velocity based on the other
   * members of the flock.
   * It is passed the entire flock (an array of Boids) - that includes
   * "this"!
   * Note: dealing with the boundaries does not need to be handled here
   * (in fact it can't be, since there is no awareness of the canvas)
   * *
   * And remember, (vx,vy) should always be a unit vector!
   */
  steer() {
    alignment(this);
    separation(this);
    cohesion(this);
    borderRejection(this);
  }
}

// push boids away from the borders of canvas (more visually pleasing with flocking enabled)
function borderRejection(boid) {
  if (boid.x < margin) {
    boid.vx += rejection;
  }
  if (boid.x > canvas.width - margin) {
    boid.vx -= rejection;
  }
  if (boid.y < margin) {
    boid.vy += rejection;
  }
  if (boid.y > canvas.height - margin) {
    boid.vy -= rejection;
  }
}

// Implement “alignment” steering
function alignment(boid1) {
  let avgVx = 0;
  let avgVy = 0;
  let neighbors = 0;

  // loop through all the boids and if there is another
  // boid within the given range (controlled by slider)
  // add that boids velocity to the running totals
  theBoids.forEach(function (boid2) {
    if (distance(boid1, boid2) < alignmentRange) {
      avgVx += boid2.vx;
      avgVy += boid2.vy;
      neighbors++;
    }
  });

  // if the boid had neighbors calculate the average direction vector
  // and use that to update the boid
  if (neighbors != 0) {
    avgVx /= neighbors;
    avgVy /= neighbors;

    // update the boid and use strength given by slider
    boid1.vx += (avgVx - boid1.vx) * alignmentFactor;
    boid1.vy += (avgVy - boid1.vy) * alignmentFactor;

    // normalize the vector to be unit velocity
    normalize(boid1);
  }
}

// function to Implement “separation” steering
function separation(boid1) {
  let moveX = 0;
  let moveY = 0;

  // check if any boids are within the min distance
  theBoids.forEach(function (boid2) {
    if (boid2 != boid1) {
      if (distance(boid1, boid2) < minDistance) {
        moveX += boid1.x - boid2.x;
        moveY += boid1.y - boid2.y;
      }
    }
  });

  // update boid velocity
  boid1.vx += moveX * separationFactor;
  boid1.vy += moveY * separationFactor;

  // normalize the vector to be unit velocity
  normalize(boid1);
}

// function to Implement “cohesion” steering
function cohesion(boid1) {
  let centerX = 0;
  let centerY = 0;
  let neighbors = 0;

  // add all boids positions within given range (controlled by slider)
  theBoids.forEach(function (boid2) {
    if (distance(boid1, boid2) < alignmentRange) {
      centerX += boid2.x;
      centerY += boid2.y;
      neighbors++;
    }
  });

  // if the boid had neighbors calculate the average center
  // and use that to update the boid
  if (neighbors != 0) {
    centerX /= neighbors;
    centerY /= neighbors;

    boid1.vx += (centerX - boid1.x) * cohesionFactor;
    boid1.vy += (centerY - boid1.y) * cohesionFactor;
  }

  // normalize the vector to be unit velocity\
  normalize(boid1);
}

// helper function to calc distance between two boids
function distance(boid1, boid2) {
  return Math.sqrt(
    (boid1.x - boid2.x) * (boid1.x - boid2.x) +
      (boid1.y - boid2.y) * (boid1.y - boid2.y)
  );
}

// helper function to normalize vector to unit velocity
function normalize(boid) {
  let length = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy);
  boid.vx /= length;
  boid.vy /= length;
}

/** the actual main program
 * this used to be inside of a function definition that window.onload
 * was set to - however, now we use defer for loading
 */

/** @type Array<Boid> */
let theBoids = [];
let rects = [];

// setup HTML canvas
let canvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("flock")
);
let context = canvas.getContext("2d");

// setup sliders
let speedSlider = /** @type {HTMLInputElement} */ (
  document.getElementById("speed")
);
let widthSlider = /** @type {HTMLInputElement} */ (
  document.getElementById("width")
);
let altColorFramesSlider = /** @type {HTMLInputElement} */ (
  document.getElementById("frames")
);
let numObstaclesSlider = /** @type {HTMLInputElement} */ (
  document.getElementById("obstacles")
);
let alignmentSlider = /** @type {HTMLInputElement} */ (
  document.getElementById("alignment")
);
let separationSlider = /** @type {HTMLInputElement} */ (
  document.getElementById("separation")
);
let cohesionSlider = /** @type {HTMLInputElement} */ (
  document.getElementById("cohesion")
);
let alignmentRangeSlider = /** @type {HTMLInputElement} */ (
  document.getElementById("range")
);
let marginSlider = /** @type {HTMLInputElement} */ (
  document.getElementById("margin")
);
let checkCollisionsBox = /** @type {HTMLInputElement} */ (
  document.getElementById("checkCollisions")
);
let fpsDisplay = /** @type {HTMLInputElement} */ (
  document.getElementById("fps")
);
let rejectionSlider = /** @type {HTMLInputElement} */ (
  document.getElementById("rejection")
);
let minDistanceSlider = /** @type {HTMLInputElement} */ (
  document.getElementById("minDistance")
);

// global params
let width,
  altColorFrames,
  numRects,
  speed,
  alignmentFactor,
  separationFactor,
  cohesionFactor,
  alignmentRange,
  margin,
  checkCollisions,
  rejection,
  minDistance;

// handlers for the sliders
widthSlider.oninput = function () {
  width = Number(widthSlider.value);
};
altColorFramesSlider.oninput = function () {
  altColorFrames = Number(altColorFramesSlider.value);
};
numObstaclesSlider.onchange = function () {
  init();
};
alignmentSlider.oninput = function () {
  alignmentFactor = Number(alignmentSlider.value);
};
separationSlider.oninput = function () {
  separationFactor = Number(separationSlider.value);
};
cohesionSlider.oninput = function () {
  cohesionFactor = Number(cohesionSlider.value);
};
alignmentRangeSlider.oninput = function () {
  alignmentRange = Number(alignmentRangeSlider.value);
};
marginSlider.oninput = function () {
  margin = Number(marginSlider.value);
};
checkCollisionsBox.onchange = function () {
  if (checkCollisionsBox.checked) {
    checkCollisions = true;
  } else {
    checkCollisions = false;
  }
};
rejectionSlider.oninput = function () {
  rejection = Number(rejectionSlider.value);
};
minDistanceSlider.oninput = function () {
  minDistance = Number(minDistanceSlider.value);
};

// helper function to initialize values from sliders,
// clear the frame, empty boid and obstacle lists,
// and draw initial boids and obstacles
function init() {
  // get initial values from sliders
  width = Number(widthSlider.value);
  altColorFrames = Number(altColorFramesSlider.value);
  numRects = Number(numObstaclesSlider.value);
  alignmentFactor = Number(alignmentSlider.value);
  separationFactor = Number(separationSlider.value);
  cohesionFactor = Number(cohesionSlider.value);
  alignmentRange = Number(alignmentRangeSlider.value);
  rejection = Number(rejectionSlider.value);
  margin = Number(marginSlider.value);
  minDistance = Number(minDistanceSlider.value);
  if (checkCollisionsBox.checked) {
    checkCollisions = true;
  } else {
    checkCollisions = false;
  }

  // clear canvas and lists
  context.clearRect(0, 0, canvas.width, canvas.height);
  theBoids.splice(0, theBoids.length);
  rects.splice(0, rects.length);

  // generate obstacles
  for (let i = 0; i < numRects; i++) {
    let x = getRndInteger(margin + 50, canvas.width - margin - 50);
    let y = getRndInteger(margin + 50, canvas.width - margin - 50);
    rects.push({ x: x, y: y });
  }
  addTen();
}

// draw the rectangle obstacles and boids
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  rects.forEach(function (rect) {
    context.fillRect(rect.x, rect.y, 50, 50);
  });
  theBoids.forEach((boid) => boid.draw(context));
}

/**
 * Setup
 */
init();

/**
 * Handle the buttons
 */
document.getElementById("add").onclick = function () {
  addTen();
};
document.getElementById("clear").onclick = function () {
  theBoids.splice(0, theBoids.length);
  rects.splice(0, rects.length);
};
document.getElementById("reset").onclick = function () {
  altColorFramesSlider.value = "5";
  widthSlider.value = "10";
  numObstaclesSlider.value = "3";
  speedSlider.value = "3";
  alignmentSlider.value = ".2";
  separationSlider.value = "0.05";
  cohesionSlider.value = "0";
  alignmentRangeSlider.value = "75";
  marginSlider.value = "50";
  checkCollisionsBox.checked = false;
  rejectionSlider.value = "0.4";
  minDistanceSlider.value = "20";

  init();
};
document.getElementById("default").onclick = function () {
  altColorFramesSlider.value = "5";
  widthSlider.value = "10";
  numObstaclesSlider.value = "3";
  speedSlider.value = "3";
  alignmentSlider.value = "0";
  separationSlider.value = "0";
  cohesionSlider.value = "0";
  alignmentRangeSlider.value = "0";
  marginSlider.value = "0";
  checkCollisionsBox.checked = true;
  rejectionSlider.value = "0";
  minDistanceSlider.value = "0";

  init();
};

// helper function to add 10 boids in random positions
// that are not within an obstacle
function addTen() {
  for (let i = 0; i < 10; i++) {
    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;

    // keep getting random positions until
    // not within an obstacle
    do {
      x = getRndInteger(0, canvas.width);
      y = getRndInteger(0, canvas.height);
    } while (inRect(x, y, rects));

    // get a random angle to point
    let angle = Math.random() * Math.PI * 2;
    vx = Math.cos(angle);
    vy = Math.sin(angle);

    // add the boid to the list
    theBoids.push(new Boid(x, y, vx, vy));
  }
}

// helper function to determine if a point
// is within the path of a given list of objects
function inRect(x, y, objList) {
  for (let i = 0; i < objList.length; i++) {
    if (
      Math.abs(x - (objList[i].x + 25)) <= 25 &&
      Math.abs(y - (objList[i].y + 25)) <= 25
    ) {
      return true;
    }
  }
  return false;
}

// helper function to generate a random int
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let lastTime;
let count = 0;
/**
 * The Actual Execution
 */
function loop(timestamp) {
  // display the FPS (update only every 5 cycles for readability)
  let delta = (timestamp - lastTime) / 1000;
  lastTime = timestamp;
  if (count > 5) {
    fpsDisplay.innerHTML = (1 / delta).toFixed(0);
    count = 0;
  }
  count++;

  // change directions
  theBoids.forEach((boid) => boid.steer());

  // move forward
  theBoids.forEach(function (boid) {
    // global params
    speed = Number(speedSlider.value);

    // update position
    boid.x += boid.vx * speed;
    boid.y += boid.vy * speed;

    // make sure did not go off canvas
    if (boid.y >= canvas.height || boid.y <= 0) {
      boid.vy *= -1;
      boid.y += boid.vy * speed;
      boid.altColor = altColorFrames;
    }
    if (boid.x >= canvas.width || boid.x <= 0) {
      boid.vx *= -1;
      boid.x += boid.vx * speed;
      boid.altColor = altColorFrames;
    }

    // check if hitting an obstacle and bounce off
    if (inRect(boid.x, boid.y, rects)) {
      boid.vx *= -1;
      boid.x += boid.vx * speed;
      boid.vy *= -1;
      boid.y += boid.vy * speed;
      boid.altColor = altColorFrames;
    }
  });

  // now we can draw
  draw();

  // and loop
  window.requestAnimationFrame(loop);
}

// start the loop with the first iteration
window.requestAnimationFrame(loop);
