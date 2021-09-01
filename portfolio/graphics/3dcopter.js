/*jshint esversion: 6 */
// @ts-check

/**
 * Minimal Starter Code for the QuadCopter assignment
 */

import * as T from "./libs/CS559-Three/build/three.module.js";
import { MathUtils } from "./libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "./libs/CS559-Three/examples/jsm/controls/OrbitControls.js";

let renderer = new T.WebGLRenderer();
renderer.setSize(600, 400);
document.body.appendChild(renderer.domElement);

let scene = new T.Scene();
let camera = new T.PerspectiveCamera(
  40,
  renderer.domElement.width / renderer.domElement.height,
  1,
  1000
);

camera.position.z = 10;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(0, 0, 0);

// since we're animating, add OrbitControls
let controls = new OrbitControls(camera, renderer.domElement);

scene.add(new T.AmbientLight("white", 0.2));

// two lights - both a little off white to give some contrast
let dirLight1 = new T.DirectionalLight(0xf0e0d0, 1);
dirLight1.position.set(1, 1, 0);
scene.add(dirLight1);

let dirLight2 = new T.DirectionalLight(0xd0e0f0, 1);
dirLight2.position.set(-1, 1, -0.2);
scene.add(dirLight2);

// make a ground plane
let groundBox = new T.BoxGeometry(10, 0.1, 10);
let groundMesh = new T.Mesh(
  groundBox,
  new T.MeshStandardMaterial({ color: 0x88b888, roughness: 0.9 })
);
// put the top of the box at the ground level (0)
groundMesh.position.y = -0.05;
scene.add(groundMesh);

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
let whiteMat = new T.MeshStandardMaterial({
  color: "#FDFFFE",
  roughness: 0.8,
  metalness: 0.9,
  side: T.DoubleSide,
});
let redMat = new T.MeshStandardMaterial({
  color: "#F12700",
  roughness: 0.8,
  metalness: 0.9,
  side: T.DoubleSide,
});
let blueMat = new T.MeshStandardMaterial({
  color: "#00BCF2",
  roughness: 0.8,
  metalness: 0.9,
  side: T.DoubleSide,
});

let blackMat = new T.MeshStandardMaterial({ color: "black", roughness: 0 });

/*
 * Make the Copter
 */
let copter = new T.Group();

let body = new T.Mesh(new T.CylinderGeometry(1, 1, 3, 32), grayMat);
body.scale.set(0.5, 0.5, 0.5);
body.position.y = 2;
body.rotateZ(T.MathUtils.degToRad(90));
body.rotateX(T.MathUtils.degToRad(90));
copter.add(body);

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

// add copter to world
scene.add(copter);

/*
 * Make the dish
 */
let radar1 = new T.Group();

// base of the dish
let base = new T.Mesh(new T.CylinderGeometry(0.1, 0.3, 1, 32), grayMat);
base.position.set(0, 0.5, 0);
radar1.add(base);

// pole for dish to be mounted on
let pole = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 1, 32), grayMat);
pole.position.set(0, 1.35, 0);
radar1.add(pole);

// ball for dish to rotate on
let bearing = new T.Mesh(new T.SphereGeometry(0.25, 32, 32), grayMat);
bearing.position.set(0, 1.75, 0);
radar1.add(bearing);

// make the dish itself from lathe geometry
let points = [];
for (let i = 0; i < 10; i++) {
  points.push(new T.Vector2((Math.sin(i * 0.2) * 15 + 5) * 0.04, i * 0.075));
}
var lathe = new T.Mesh(new T.LatheGeometry(points, 20), orangeMat);
lathe.position.y = 1.75;
radar1.position.x = -4;
radar1.position.z = -4;
radar1.add(lathe);

// add dish to scene
scene.add(radar1);

/*
 * Make a second copter
 */
let copter2 = copter.clone();
copter2.children[0].material = whiteMat;
copter2.children[1].material = whiteMat;
copter2.children[2].material = whiteMat;
copter2.children[3].material = redMat;
copter2.children[6].material = whiteMat;
copter2.children[7].material = redMat;
copter2.children[8].material = redMat;
copter2.children[9].material = redMat;
copter2.children[10].material = redMat;

copter2.scale.set(0.5, 0.5, 0.5);
copter2.position.y = 2;
copter2.position.x = 3;
scene.add(copter2);

// get the propellors from it
let prop1_2 = copter2.children[4];
let prop2_2 = copter2.children[5];

/*
 * Make a second dish
 */
let radar2 = radar1.clone();
radar2.children[0].material = whiteMat;
radar2.children[1].material = whiteMat;
radar2.children[2].material = whiteMat;
radar2.children[3].material = redMat;

radar2.position.x = -4;
radar2.position.z = 4;
scene.add(radar2);

/*
 * Make a third copter
 */
let copter3 = new T.Group();
copter3.position.x = 2;
let body_3 = new T.Mesh(new T.SphereGeometry(1.2, 32), blueMat);
body_3.scale.set(0.5, 0.5, 0.5);
body_3.position.y = 2;
copter3.add(body_3);

front = new T.Mesh(new T.CylinderGeometry(1, 1, 0.5, 32), whiteMat);
front.scale.set(0.2, 0.2, 0.2);
front.position.y = 2;
front.position.z = 0.6;
front.rotateZ(T.MathUtils.degToRad(90));
front.rotateX(T.MathUtils.degToRad(90));
copter3.add(front);

// make the propellers
// make propeller 1
let prop3_1 = prop1.clone();
prop3_1.position.x = 0;
prop3_1.position.y = 0.1;
copter3.add(prop3_1);

// make propeller 2
let prop3_2 = prop1.clone();
prop3_2.rotateZ(-Math.PI / 2);
prop3_2.position.y = 2;
prop3_2.position.z = -1.75;
prop3_2.position.x = -1.15;
prop3_2.scale.set(0.5, 0.5, 0.5);
copter3.add(prop3_2);

// make the arm
arm = new T.Mesh(new T.CylinderGeometry(0.5, 0.5, 8), whiteMat);
arm.scale.set(0.2, 0.2, 0.2);
arm.position.y = 2;
arm.position.z = -1;
arm.rotateX(MathUtils.degToRad(90));
copter3.add(arm);

// make the bearing
bearing1 = new T.Mesh(new T.SphereGeometry(0.15, 32, 32), whiteMat);
bearing1.position.y = 2.6;
copter3.add(bearing1);
bearing2 = bearing1.clone();
bearing2.position.z = -1.75;
bearing2.position.y = 2;
copter3.add(bearing2);

// add copter to world
copter3.scale.set(0.5, 0.5, 0.5);
copter3.position.y = 2;
copter3.position.x = 0;
copter3.position.z = 0;
scene.add(copter3);

/*
 * Make a third dish
 */
let radar3 = radar1.clone();
radar3.children[0].material = whiteMat;
radar3.children[1].material = whiteMat;
radar3.children[2].material = whiteMat;
radar3.children[3].material = blueMat;

radar3.position.x = 4;
radar3.position.z = 4;
scene.add(radar3);

// increments to move on key input
let increment = 0.3;
let speed = 1;

// handle keypress
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(e) {
  var keyCode = e.which;
  if (keyCode == 38) {
    copter3.position.z -= increment;
  } else if (keyCode == 40) {
    copter3.position.z += increment;
  } else if (keyCode == 37) {
    copter3.position.x -= increment;
  } else if (keyCode == 39) {
    copter3.position.x += increment;
  } else if (keyCode == 39) {
    copter3.position.x += increment;
  } else if (keyCode == 187) {
    speed += increment;
  } else if (keyCode == 189) {
    speed -= increment;
  } else if (keyCode == 82) {
    copter3.position.set(0, 2, 0);
    speed = 1;
    body_3.material = blueMat;
    radar3.children[3].material = blueMat;
  } else if (keyCode == 67) {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    let randMat = new T.MeshStandardMaterial({
      color: "#" + randomColor,
      roughness: 0.8,
      metalness: 0.9,
      side: T.DoubleSide,
    });
    body_3.material = randMat;
    radar3.children[3].material = randMat;
  }
}

/*
 * Animate
 */
let lastTimestamp; // undefined to start

// animation loop
function animateLoop(timestamp) {
  let timeDelta = lastTimestamp ? timestamp - lastTimestamp : 0;
  lastTimestamp = timestamp;
  // move in a circle
  let theta = timestamp / 1000;
  let x = 3 * Math.cos(theta);
  let z = 3 * Math.sin(theta);

  // animate copter 1
  prop1.rotateY(timeDelta / 100);
  prop2.rotateY(timeDelta / 100);
  copter.position.x = x;
  copter.position.z = z;
  copter.lookAt(new T.Vector3(x - z, copter.position.y, z + x));
  lathe.lookAt(copter.position);
  lathe.rotateX(Math.PI / 4);

  // animate copter 2
  prop1_2.rotateY(timeDelta / 100);
  prop2_2.rotateY(timeDelta / 100);
  theta = timestamp / 500;
  x = 3 * Math.cos(theta);
  z = 3 * Math.sin(theta);
  x += copter.position.x;
  z += copter.position.z;
  copter2.position.x = x;
  copter2.position.z = z;
  copter2.lookAt(copter.position);
  let lathe_2 = radar2.children[3];
  lathe_2.lookAt(copter2.position);
  lathe_2.rotateX(Math.PI / 3);

  // animate copter 3
  prop3_1.rotateY(timeDelta / 100);
  prop3_2.rotateY(timeDelta / 100);
  copter3.rotateX((timeDelta / 400) * speed);
  let lathe_3 = radar3.children[3];
  lathe_3.lookAt(copter3.position);
  lathe_3.rotateX(Math.abs(copter2.rotation.x) / 3 + Math.PI / 3.5);

  renderer.render(scene, camera);
  window.requestAnimationFrame(animateLoop);
}
window.requestAnimationFrame(animateLoop);
