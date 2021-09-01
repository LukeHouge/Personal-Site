import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrObject } from "./libs/CS559-Framework/GrObject.js";
import { MathUtils } from "./libs/CS559-Three/build/three.module.js";
import { GLTFLoader } from "./libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";
import { shaderMaterial } from "./libs/CS559-Framework/shaderHelper.js";
import * as Loaders from "./libs/CS559-Framework/loaders.js";

// define materials
let grayMat = new T.MeshStandardMaterial({
  color: "#4B688B",
  roughness: 0.8,
  metalness: 0.9,
  side: T.DoubleSide,
});
let orangeMat = new T.MeshStandardMaterial({
  color: "#F77C11",
  roughness: 0.8,
  metalness: 0.9,
  side: T.DoubleSide,
});
let blackMat = new T.MeshStandardMaterial({ color: "black", roughness: 0 });
let silverMat = new T.MeshStandardMaterial({
  color: "grey",
  roughness: 0.1,
  metalness: 0.9,
});

// global arr to hold car objects so they can be used by
// the animate function rather than having their own stepWorld
let cars = [];

// Create the track curve points
const curve = new T.CatmullRomCurve3([
  new T.Vector3(40, 0.1, -40),
  new T.Vector3(35, 0.1, -38),
  new T.Vector3(30, 0.1, -30),
  new T.Vector3(25, 0.1, -28),
  new T.Vector3(26, 0.1, -20),
  new T.Vector3(20, 0.1, -10),
  new T.Vector3(10, 0.1, 40),
  new T.Vector3(15, 0.1, 45),
  new T.Vector3(13, 0.1, 55),
  new T.Vector3(30, 0.1, 70),
  new T.Vector3(32, 0.1, 68),
  new T.Vector3(20, 0.1, 55),
  new T.Vector3(35, 0.1, 20),
  new T.Vector3(40, 0.1, 20),
  new T.Vector3(45, 0.1, 30),
  new T.Vector3(50, 0.1, 50),
  new T.Vector3(60, 0.1, 48),
  new T.Vector3(65, 5, 70),
  new T.Vector3(80, 12, 60),
  new T.Vector3(80, 14, 50),
  new T.Vector3(80, 15, 40),
  new T.Vector3(60, 15, 20),
  new T.Vector3(55, 15, 10),
  new T.Vector3(45, 12, 0),
  new T.Vector3(55, 7, -10),
  new T.Vector3(40, 0.1, -40),
]);

/**
 * Create the first F1 car from a model and push it to the cars array with it's attributes
 * needed to annimate it along the track, and keep track of things like its laps / times
 */
export class F1Car extends GrObject {
  constructor() {
    // import an F1 car (from THREE documentation)
    let car = new T.Group();
    const loader = new GLTFLoader();

    loader.load("images/red_bull_racing/scene.gltf", function (gltf) {
      car.add(gltf.scene);

      //box.visible = false;
    });

    // scale
    car.scale.set(0.0266, 0.0266, 0.0266);

    super("F1 Car (RedBull)", car);

    cars.push({
      car: car, // the car obj itself
      counter: 0, // current position around curve
      speed: 1, // current speed (start at no change to world speed)
      speedLast: 0, // speed last iteration (used to smooth changes)
      accum: 1, // accumulating var that does not get reset to determine when to generate new speed
      laps: 0, // laps completed around track
      time: 0, // current lap time
      fastest: -1, // fastest lap time (start at -1 to indicate first lap)
    });
  }

  /**
   * Animate the car (simply calls the animate function)
   */
  stepWorld(delta, timeOfDay) {
    animate(delta);
  }
}

/**
 * Create the second F1 car from a model and push it to the cars array with it's attributes
 * needed to annimate it along the track, and keep track of things like its laps / times
 */
export class F1Car2 extends GrObject {
  constructor() {
    // import an F1 car (from THREE documentation)
    let car = new T.Group();
    const loader = new GLTFLoader();
    loader.load("images/racecar/scene.gltf", function (gltf) {
      car.add(gltf.scene);
    });

    // scale
    car.scale.set(1.5, 1.5, 1.5);

    super("F1 Car (Renault)", car);

    // attach a ride point
    this.ridePoint = new T.Object3D();
    this.ridePoint.translateY(0.5);
    this.objects[0].add(this.ridePoint);
    this.rideable = this.ridePoint;

    cars.push({
      car: car, // the car obj itself
      counter: 0, // current position around curve
      speed: 1, // current speed (start at no change to world speed)
      speedLast: 0, // speed last iteration (used to smooth changes)
      accum: 1, // accumulating var that does not get reset to determine when to generate new speed
      laps: 0, // laps completed around track
      time: 0, // current lap time
      fastest: -1, // fastest lap time (start at -1 to indicate first lap)
    });
  }

  /**
   * Animate the car (simply calls the animate function)
   */
  stepWorld(delta, timeOfDay) {
    animate(delta);
  }
}

/**
 * Create a track, extruded along a spline
 */
export class Track extends GrObject {
  constructor() {
    let track = new T.Group();

    // settings to be used for extruding along the curve
    const extrudeSettings = {
      steps: 100,
      bevelEnabled: false,
      extrudePath: curve,
    };

    // extrude along the path (from THREE example)
    let points = [];
    let count = 3;
    for (let i = 0; i < count; i++) {
      const l = 1.5;
      const a = ((2 * i) / count) * Math.PI;
      points.push(new T.Vector2(Math.cos(a) * l, Math.sin(a) * l));
    }

    // create a shape/geometry using the array of points
    const shape = new T.Shape(points);
    const geometry = new T.ExtrudeGeometry(shape, extrudeSettings);

    // create a new material using shaders to make a rocky road like texture
    let shaderMat = shaderMaterial("./road.vs", "./road.fs", {});

    // make the track mesh itself and add to the group
    var mesh = new T.Mesh(geometry, shaderMat);
    track.add(mesh);

    // make mounts to hold up the track when its Y position is above ground
    let mounts = new T.Group();
    track.add(mounts);
    for (let i = 0; i < 1; i += 0.04) {
      // get arc length parameterization
      let t = curve.getUtoTmapping(i);
      let pt = curve.getPoint(t);

      // if the track is above ground, add a mount
      if (pt.y > 0.2) {
        // make the mount itself
        let mount = new T.Mesh(new T.CylinderGeometry(1, 1, pt.y), silverMat);

        // position the mount along the curve
        mount.position.x = pt.x;
        mount.position.z = pt.z;
        mount.position.y = pt.y / 2;
        mounts.add(mount);
      }
    }

    // add to world
    super("Track", track);
  }
}

/**
 * Create a leader board to show the laps completed by each car, as well as fastest
 * lap by each, and a "screen" showing the track from the view of a floating camera
 */
export class Board extends GrObject {
  constructor(x, y, z, angle, world) {
    let board = new T.Group();

    var geometry = new T.PlaneGeometry(4, 2);

    // create a canvas that will be used as a 2D texture to display the leader board
    let canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 100;
    let ctx = canvas.getContext("2d");

    // fill and style the canvas
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 300, 100);
    ctx.fillStyle = "black";
    ctx.font = "35px sans-serif";

    // make the mesh for the board, using canvas as texture map
    let texture = new T.CanvasTexture(canvas);
    let material = shaderMaterial("./noise.vs", "./noise.fs", {
      side: T.DoubleSide,
      uniforms: {
        tex: { value: texture },
      },
    });
    //let material = new T.MeshBasicMaterial({ map: texture });
    let display = new T.Mesh(geometry, material);
    display.translateX(1);
    board.add(display);

    // update texture
    texture.needsUpdate = true;

    // make a box (the body of the board)
    let box = new T.Mesh(new T.BoxGeometry(6, 2, 0.5), blackMat);
    box.translateZ(-0.252);
    board.add(box);

    // make mounts to hold board up
    let mount1 = new T.Mesh(new T.CylinderGeometry(0.15, 0.15, 3), silverMat);
    mount1.translateY(-1.75);
    mount1.translateX(-1);
    mount1.translateZ(-0.25);
    board.add(mount1);

    let mount2 = mount1.clone();
    mount1.translateX(2);
    board.add(mount2);

    // position the board
    board.translateY(10);
    board.scale.set(3, 3, 3);
    board.position.x = x;
    board.position.y = y;
    board.position.z = z;
    board.rotateY(angle);

    // add to world
    super("Leader Board", board);
    this.ctx = ctx;
    this.texture = texture;

    // make the dynamic screen portion, using a cubecam and two-pass rendering
    this.world = world;
    const cubeRenderTarget = new T.WebGLCubeRenderTarget(1024); // target to render onto
    this.cubecam = new T.CubeCamera(10, 1000, cubeRenderTarget); // camera to capture render
    this.screenGeom = new T.PlaneBufferGeometry(2, 2); // plane to display the render
    this.screenMat = new T.MeshBasicMaterial({
      // make a material using renderTarget as texture
      color: "white",
      envMap: this.cubecam.renderTarget.texture,
    });
    this.screen = new T.Mesh(this.screenGeom, this.screenMat); // make the screen itself
    this.screen.translateX(-2);
    board.add(this.cubecam);
    board.add(this.screen);

    // position the camera
    this.cubecam.position.y = 5;
    this.cubecam.position.x = 15;
    this.cubecam.position.z = 15;

    //this.cubecam.rotateY(-Math.PI / 2);
    //this.cubecam.rotateX(-Math.PI / 4);
  }

  /**
   * Animate the leader board
   */
  stepWorld(delta, timeOfDay) {
    let leader = -1;

    // determine who the leader is-- first check laps, if the laps are equal compare
    // the position along the curve inside the current lap
    if (cars[0].laps > cars[1].laps) {
      leader = 0;
    } else if (cars[0].laps < cars[1].laps) {
      leader = 1;
    } else if (cars[0].counter > cars[1].counter) {
      leader = 0;
    } else {
      leader = 1;
    }

    // determine if the car is on first lap or not
    // if not on first lap, convert the time in ms to readable format
    let fastest1, fastest2;
    if (cars[0].fastest == -1) {
      fastest1 = "On first lap";
    } else {
      fastest1 = time(cars[0].fastest);
    }
    if (cars[1].fastest == -1) {
      fastest2 = "On first lap";
    } else {
      fastest2 = time(cars[1].fastest);
    }

    // make the leader board, with different order depending on who is leading
    if (leader == 0) {
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(0, 0, 300, 50);
      this.ctx.fillStyle = "blue";
      this.ctx.fillRect(0, 50, 300, 100);
      this.ctx.fillStyle = "black";
      this.ctx.font = "30px sans-serif";
      this.ctx.fillText(`Redbull: ${cars[0].laps} laps`, 20, 25);
      this.ctx.fillText(`Renault: ${cars[1].laps} laps`, 20, 75);
      this.ctx.font = "20px sans-serif";
      this.ctx.fillText(`fastest lap: ${fastest1}`, 20, 45);
      this.ctx.fillText(`fastest lap: ${fastest2}`, 20, 95);
    } else {
      this.ctx.fillStyle = "blue";
      this.ctx.fillRect(0, 0, 300, 50);
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(0, 50, 300, 100);
      this.ctx.fillStyle = "black";
      this.ctx.font = "30px sans-serif";
      this.ctx.fillText(`Renault: ${cars[1].laps} laps`, 20, 25);
      this.ctx.fillText(`Redbull: ${cars[0].laps} laps`, 20, 75);
      this.ctx.font = "20px sans-serif";
      this.ctx.fillText(`fastest lap: ${fastest2}`, 20, 45);
      this.ctx.fillText(`fastest lap: ${fastest1}`, 20, 95);
    }

    // update the canvas texture on the board
    this.texture.needsUpdate = true;

    // update the dynamic env map from cubeCam
    this.cubecam.lookAt(cars[0].car.position);
    this.cubecam.rotateY(-Math.PI / 4);
    this.cubecam.update(this.world.renderer, this.world.scene);
  }
}

/**
 * Animates the two cars along the track
 * @param {*} delta
 */
function animate(delta) {
  let up = new T.Vector3(0, 0, 1); // axis to be "up" for rotations along track
  let axis = new T.Vector3(); // axis to rotate around
  let radians, tangent;

  // loop through the cars array, moving each car along the curved track
  cars.forEach(function (carObj) {
    // the car is currently a portion along the track
    if (carObj.counter <= 1) {
      // convert to arc length
      let t = curve.getUtoTmapping(carObj.counter);

      // get a new random speed every 100 cycles
      if (carObj.accum % 100 == 0) {
        carObj.speedLast = getRand(0.5, 3);
      }

      // smooth out the changes in speed for more pleasing appearance
      if (carObj.speed < carObj.speedLast) {
        carObj.speed += 0.01;
      } else if (carObj.speed > carObj.speedLast) {
        carObj.speed -= 0.01;
      }

      // set the position
      carObj.car.position.copy(curve.getPoint(t));
      carObj.car.translateY(0.75);

      // shift the second car model
      if (carObj == cars[1]) {
        carObj.car.translateY(0.75);
      }

      // get the tangent to the curve
      tangent = curve.getTangent(t).normalize();

      // calculate the axis to rotate around
      axis.crossVectors(up, tangent).normalize();

      // calculate the angle between the up vector and the tangent
      radians = Math.acos(up.dot(tangent));

      // set the quaternion
      carObj.car.quaternion.setFromAxisAngle(axis, radians);

      // update the cars parameters
      carObj.counter += (delta / 10000) * carObj.speed;
      carObj.accum++;
      carObj.time += delta;
    }
    // the car has just completed a lap
    else {
      // update the cars parameters (fastest lap is last lap was quicker, reset others, increment laps)
      if (carObj.fastest > carObj.time || carObj.fastest == -1)
        carObj.fastest = carObj.time;
      carObj.counter = 0;
      carObj.time = 0;
      carObj.laps++;
    }
  });
}

/**
 * Make a drone quad copter to follow around the track (from previous WB)
 */
export class Copter extends GrObject {
  constructor(x, y, z) {
    let copter = new T.Group();

    // body of the copter
    let body = new T.Mesh(new T.CylinderGeometry(1, 1, 3, 32), grayMat);
    body.scale.set(0.5, 0.5, 0.5);
    body.position.y = 2;
    body.rotateZ(T.MathUtils.degToRad(90));
    body.rotateX(T.MathUtils.degToRad(90));
    copter.add(body);

    // front and back
    const frontCone = new T.Mesh(
      new T.SphereGeometry(0.5, 32, 32, 0, Math.PI),
      grayMat
    );
    frontCone.position.y = 2;
    frontCone.position.z = 0.74;
    copter.add(frontCone);
    const backCone = frontCone.clone();
    backCone.rotateX(T.MathUtils.degToRad(180));
    backCone.position.z = -0.74;
    copter.add(backCone);

    let front = new T.Mesh(new T.CylinderGeometry(1, 1, 0.5, 32), blackMat);
    front.scale.set(0.2, 0.2, 0.2);
    front.position.y = 2;
    front.position.z = 1.2;
    front.rotateZ(T.MathUtils.degToRad(90));
    front.rotateX(T.MathUtils.degToRad(90));
    copter.add(front);

    // make the propellers
    // make propeller 1
    let prop1 = new T.Group();
    let rotor1 = new T.Mesh(new T.BoxGeometry(1, 0.3, 10), blackMat);
    rotor1.scale.set(0.2, 0.2, 0.2);
    rotor1.position.y = 2.6;
    prop1.add(rotor1);
    const rotor2 = rotor1.clone();
    rotor2.rotateY(T.MathUtils.degToRad(90));
    prop1.add(rotor2);
    prop1.position.x = -1.5;
    copter.add(prop1);

    // make propeller 2
    let prop2 = prop1.clone();
    prop2.position.x = 1.5;
    copter.add(prop2);

    // make the arm
    let arm = new T.Mesh(new T.BoxGeometry(2, 2, 15), grayMat);
    arm.scale.set(0.2, 0.2, 0.2);
    arm.position.y = 2;
    arm.rotateY(MathUtils.degToRad(90));
    copter.add(arm);

    // make the engine/turbine?
    let turbine1 = new T.Mesh(new T.CylinderGeometry(0.3, 0.2, 1), orangeMat);
    turbine1.position.y = 2;
    turbine1.position.x = -1.5;
    copter.add(turbine1);
    let turbine2 = turbine1.clone();
    turbine2.position.x = 1.5;
    copter.add(turbine2);

    // make the bearing
    let bearing1 = new T.Mesh(new T.SphereGeometry(0.1, 32, 32), orangeMat);
    bearing1.position.y = 2.6;
    bearing1.position.x = -1.5;
    copter.add(bearing1);
    let bearing2 = bearing1.clone();
    bearing2.position.x = 1.5;
    copter.add(bearing2);

    copter.translateX(x);
    copter.translateY(y);
    copter.translateZ(z);

    // needed for it to rotate in a circle
    let time = 0;

    // add copter to world
    super("Copter", copter);
    this.prop2 = prop2;
    this.prop1 = prop1;
    this.copter = copter;
    this.time = time;

    // make a ride point
    this.ridePoint = new T.Object3D();
    this.ridePoint.translateY(1);
    this.objects[0].add(this.ridePoint);
    this.rideable = this.ridePoint;
  }

  /**
   * Animate the copter
   * @param {*} delta
   * @param {*} timeOfDay
   */
  stepWorld(delta, timeOfDay) {
    // rotate the propellors
    this.prop1.rotateY(delta / 50);
    this.prop2.rotateY(delta / 50);

    // currently partway along the curve
    if (this.time <= 1) {
      // convert to arc length
      let t = curve.getUtoTmapping(this.time);

      // set the position
      this.copter.position.copy(curve.getPoint(t));
      this.copter.position.y = 15;

      // look at the first car
      this.copter.lookAt(cars[0].car.position);

      // increment position
      this.time += delta / 20000;
    }
    // just completed a lap
    else {
      this.time = 0;
    }
  }
}
export class GrandStand extends Loaders.ObjGrObject {
  constructor(x, y, z, rot, name) {
    super({
      obj: "./images/grandstand/generic medium.obj",
      name: name,
      rot: rot,
      mtl: "./images/grandstand/generic medium.mtl",
      x: x,
      y: y,
      z: z,
    });
  }
}

/**
 * Helper function to generate a random int (from Mozilla reference)
 */
function getRand(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Convert milliseconds to time string (hh:mm:ss:mss).
 *
 * @param Number ms
 *
 * @return String of time in ISO format
 */
function time(ms) {
  return new Date(ms).toISOString().slice(11, -1);
}
