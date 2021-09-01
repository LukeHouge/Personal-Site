/**
 * 07-08-01.js - a simple JavaScript file that gets loaded with
 * page 8 of Workbook 7 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 */

import * as T from "./libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "./libs/CS559-Three/examples/jsm/controls/OrbitControls.js";

// define the renderer
let renderer = new T.WebGLRenderer();
renderer.setSize(500, 500);
document.getElementById("div1").appendChild(renderer.domElement);

// make a camera
let camera = new T.PerspectiveCamera();
camera.position.set(0, 12, 20);

// add OrbitControls
let controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 7, 0);
controls.update();

// make the scene (world)
let scene = new T.Scene();
scene.background = new T.Color(0xc0ffff);

// make an ambient light
let ambientLight = new T.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// make a directional light from angle
let dir = new T.DirectionalLight(0xffffff, 0.9);
dir.position.set(5, 5, 5);
scene.add(dir);

// make a point light
let dir2 = new T.PointLight(0xffffff, 0.2);
dir2.position.set(10, 5, 5);
scene.add(dir2);

// define materials to reuse
let blackMat = new T.MeshStandardMaterial({ color: 0x000000, roughness: 0 });
let whiteMat = new T.MeshStandardMaterial({ color: 0xffffff });

// make a ground plane
let groundBox = new T.BoxGeometry(10000, 0.1, 10000);
let groundMesh = new T.Mesh(groundBox, whiteMat);
// put the top of the box at the ground level (0)
groundMesh.position.y = -0.05;
groundMesh.position.z = 4950;
scene.add(groundMesh);

/***********************************
 * make first snowman
 ***********************************/
let snowman1 = new T.Group();
let face = new T.Group();
let body = new T.Group();

/*
 * make the body and head of the snowman with spheres
 */
// define the spheres
let sphere1 = new T.Mesh(new T.SphereGeometry(3, 32, 32), whiteMat);
let sphere2 = new T.Mesh(new T.SphereGeometry(2, 32, 32), whiteMat);
let sphere3 = new T.Mesh(new T.SphereGeometry(1.25, 32, 32), whiteMat);

// position the spheres
sphere1.position.y = 2;
sphere2.position.y = 6;
sphere3.position.y = 8.5;

// add the spheres to group
body.add(sphere1);
body.add(sphere2);
body.add(sphere3);

// add group to the snowman
snowman1.add(body);

/*
 * make the eyes of the snowman with spheres
 */
// define the spheres
let eye1 = new T.Mesh(new T.SphereGeometry(0.2, 32, 32), blackMat);
let eye2 = eye1.clone();

// position the eyes
eye1.position.y = 9;
eye2.position.y = 9;
eye1.position.z = 1;
eye2.position.z = 1;
eye1.position.x = -0.5;
eye2.position.x = 0.5;

// add the eyes to face group
face.add(eye1);
face.add(eye2);

/*
 * make the mouth of the snowman with spheres
 */
// define the spheres
let mouth = [];
mouth[0] = new T.Mesh(new T.SphereGeometry(0.1, 32, 32), blackMat);
face.add(mouth[0]);
for (let i = 1; i < 5; i++) {
  mouth[i] = mouth[0].clone();
  face.add(mouth[i]);
}

// position the spheres
mouth[0].position.x = 0;
mouth[1].position.x = 0.25;
mouth[2].position.x = -0.25;
mouth[3].position.x = 0.5;
mouth[4].position.x = -0.5;
mouth[0].position.y = 8;
mouth[1].position.y = 8.1;
mouth[2].position.y = 8.1;
mouth[3].position.y = 8.2;
mouth[4].position.y = 8.2;
mouth[0].position.z = 1.1;
mouth[1].position.z = 1.1;
mouth[2].position.z = 1.1;
mouth[3].position.z = 1.05;
mouth[4].position.z = 1.05;

/*
 * make the nose of the snowman with a cone
 */
// define the cone
let cone = new T.Mesh(
  new T.ConeGeometry(0.3, 1.75, 32),
  new T.MeshStandardMaterial({ color: 0xf67917 })
);
cone.rotation.x = Math.PI / 2;
cone.position.y = 8.7; // position the cone
cone.position.z = 1.2; // position the cone
face.add(cone); // add the cone

/*
 * make the hat of the snowman with a cylinder
 */
// define the brim
let ring = new T.Mesh(
  new T.CylinderGeometry(1.25, 1.25, 0.25, 32),
  new T.MeshStandardMaterial({ color: 0x646464 })
);
ring.position.y = 9.5; // position the cone
face.add(ring);

// define the hat
let cylinder = new T.Mesh(
  new T.CylinderGeometry(1, 1, 1.75, 32),
  new T.MeshStandardMaterial({ color: 0x646464 })
);
cylinder.position.y = 10.25; // position the cone
face.add(cylinder);

// add face to snowman
snowman1.add(face);

// add snowman 1 to scene
snowman1.rotateY(0.25);
snowman1.position.x = -4;
scene.add(snowman1);

/***********************************
 * make second snowman
 ***********************************/
let snowman2 = new T.Group();
body = new T.Group();
face = new T.Group();

/*
 * make the body out of cubes
 */
// define the cubes
let cube1 = new T.Mesh(new T.BoxGeometry(4, 4.8, 4), whiteMat);
let cube2 = new T.Mesh(new T.BoxGeometry(3, 3, 3), whiteMat);
let cube3 = new T.Mesh(new T.BoxGeometry(2, 2, 2), whiteMat);

// position the cubes
cube1.position.y = 2.5;
cube2.position.y = 6;
cube3.position.y = 8.5;

// add the cubes to the body group
body.add(cube1);
body.add(cube2);
body.add(cube3);

/*
 * make the buttons of the snowman with cubes
 */
// make the buttons out of cubes
let button1 = new T.Mesh(new T.BoxGeometry(0.4, 0.4, 0.2), blackMat);
button1.position.z = 1.5;
let button2 = button1.clone();
let button3 = button1.clone();

// position the spheres
button1.position.y = 5.5;
button2.position.y = 6.25;
button3.position.y = 7;
// add the spheres to group
body.add(button1);
body.add(button2);
body.add(button3);

/*
 * make the arms
 */
// define the arms
let leftSeg1 = new T.Mesh(
  new T.BoxGeometry(2.5, 0.2, 0.2),
  new T.MeshStandardMaterial({ color: 0x8d6e63 })
);
let leftSeg2 = leftSeg1.clone();
let rightSeg1 = leftSeg1.clone();
let rightSeg2 = leftSeg1.clone();

// right arm
let rightArm = new T.Group();
rightArm.add(rightSeg1);
rightArm.add(rightSeg2);
rightArm.rotateZ(0.2);
rightArm.position.x += 1;

// left arm
let leftArm = new T.Group();
leftArm.add(leftSeg1);
leftArm.add(leftSeg2);

// position all the segments
leftSeg1.position.y = 6.5;
leftSeg1.position.x = -2;
leftSeg1.rotateZ(0.8);
rightSeg1.position.y = 6.5;
rightSeg1.position.x = 2;
rightSeg1.rotateZ(0.2);
leftSeg2.position.y = 4.45;
leftSeg2.position.x = -2.9;
leftSeg2.rotateZ(1.5);
rightSeg2.position.y = 7.6;
rightSeg2.position.x = 4;
rightSeg2.rotateZ(0.8);

// add the arms to the body
body.add(rightArm);
body.add(leftArm);

// add body group to snowman 2
snowman2.add(body);

/*
 * make the eyes of the snowman with boxes
 */
// define the boxes
eye1 = new T.Mesh(new T.BoxGeometry(0.3, 0.3, 0.2), blackMat);
eye2 = eye1.clone();

// position the eyes
eye1.position.y = 9;
eye2.position.y = 9;
eye1.position.z = 1;
eye2.position.z = 1;
eye1.position.x = -0.5;
eye2.position.x = 0.5;

// add the eyes to group
face.add(eye1);
face.add(eye2);

/*
 * make the mouth of the snowman with boxes
 */
// define the boxes
mouth = [];
mouth[0] = new T.Mesh(new T.BoxGeometry(0.1, 0.1, 0.1), blackMat);
face.add(mouth[0]);
for (let i = 1; i < 5; i++) {
  mouth[i] = mouth[0].clone();
  face.add(mouth[i]);
}
// position the cubes
mouth[0].position.x = 0;
mouth[1].position.x = 0.25;
mouth[2].position.x = -0.25;
mouth[3].position.x = 0.5;
mouth[4].position.x = -0.5;
mouth[0].position.y = 8;
mouth[1].position.y = 8.1;
mouth[2].position.y = 8.1;
mouth[3].position.y = 8.2;
mouth[4].position.y = 8.2;
mouth[0].position.z = 1.1;
mouth[1].position.z = 1.1;
mouth[2].position.z = 1.1;
mouth[3].position.z = 1.05;
mouth[4].position.z = 1.05;

/*
 * make the nose of the snowman with a cone
 */
// define the cone
cone = new T.Mesh(
  new T.ConeGeometry(0.3, 1.75, 32),
  new T.MeshStandardMaterial({ color: 0xf67917 })
);
cone.rotation.x = Math.PI / 2;
cone.position.y = 8.7; // position the cone
cone.position.z = 1.2; // position the cone
face.add(cone); // add the cone

/*
 * make the hat of the snowman with a cylinder
 */
// define the brim
ring = new T.Mesh(
  new T.BoxGeometry(3, 0.2, 3),
  new T.MeshStandardMaterial({ color: 0x646464 })
);
ring.position.y = 9.5; // position the ring
face.add(ring); // add to face group

// define the hat
cylinder = new T.Mesh(
  new T.BoxGeometry(1.75, 2.5, 1.75),
  new T.MeshStandardMaterial({ color: 0x646464 })
);
cylinder.position.y = 10.25; // position the cone
face.add(cylinder); // add to face group

// define the stripe of hat
let stripe = new T.Mesh(
  new T.BoxGeometry(2, 0.5, 2),
  new T.MeshStandardMaterial({ color: 0xe5504b })
);
stripe.position.y = 10; // position the stripe
face.add(stripe); // add to face group

// add face to snowman
snowman2.add(face);

// add the second snowman to the scene
snowman2.rotateY(-0.3);
snowman2.position.x = 4;
snowman2.position.z = -1;
scene.add(snowman2);

/*
 * make a tree with stacked cones
 */
// define the cylinder (trunk)
let treeMaterial = new T.MeshStandardMaterial({ color: 0x00a006 });
let treeCylinder = new T.Mesh(
  new T.CylinderGeometry(2, 2, 7, 6),
  new T.MeshStandardMaterial({ color: 0x6b2e36 })
);
let treeCone = new T.Mesh(new T.ConeGeometry(6, 5, 6), treeMaterial);
let treeCone2 = new T.Mesh(new T.ConeGeometry(5, 5, 6), treeMaterial);
let treeCone3 = new T.Mesh(new T.ConeGeometry(4, 5, 6), treeMaterial);
let treeCone4 = new T.Mesh(new T.ConeGeometry(3, 4, 6), treeMaterial);
let treeCone5 = new T.Mesh(new T.ConeGeometry(2, 3, 6), treeMaterial);
let treeCone6 = new T.Mesh(new T.ConeGeometry(1, 2, 6), treeMaterial);

// position the cylinder (trunk)
treeCylinder.position.y = 3.5;

// position the cones
treeCone.position.y = 7;
treeCone2.position.y = 10;
treeCone3.position.y = 13;
treeCone4.position.y = 15;
treeCone5.position.y = 17;
treeCone6.position.y = 18.5;

//add the components to a tree group
const tree = new T.Group();
tree.add(treeCylinder);
tree.add(treeCone);
tree.add(treeCone2);
tree.add(treeCone3);
tree.add(treeCone4);
tree.add(treeCone5);
tree.add(treeCone6);

// make 250 trees, and add to group to hold the "forest" of trees
const forest = new T.Group();
for (let i = 1; i < 250; i++) {
  let tempTree = tree.clone();
  let x = 0;
  let z = 0;

  // keep getting random positions until not inside snowman
  do {
    x = getRandomInt(-200, 200);
    z = getRandomInt(-40, 200);
  } while (Math.sqrt(Math.pow(0 - x, 2) + Math.pow(0 - z, 2)) < 20);

  // position the tree
  tempTree.position.x = x;
  tempTree.position.z = z;
  forest.add(tempTree);
}

// add "forest" to scene
scene.add(forest);

/*
 * make snow animation
 */
// define a single flake
let flake = new T.Mesh(new T.SphereGeometry(0.2, 32, 32), whiteMat);

// make an array of flakes, need to store velocity so need to store as object
let snow = [];
for (let i = 0; i < 500; i++) {
  // clone the flake and assign a random velocity
  snow[i] = { flake: flake.clone(), velocity: getRandomInt(1, 10) };

  // position the flake
  snow[i].flake.position.x = getRandomInt(-60, 60);
  snow[i].flake.position.y = 30;
  snow[i].flake.position.z = getRandomInt(-40, 20);

  // add the flake to the scene
  scene.add(snow[i].flake);
}

// helper function to get random integer between range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let lastTimestamp; // undefined to start
let count = 1; // counter to determine direction arm should be moving
let speed = 1; // determines direction of arm movement

function animate(timestamp) {
  // Convert time change from milliseconds to seconds
  let timeDelta = lastTimestamp ? timestamp - lastTimestamp : 0;
  lastTimestamp = timestamp;

  // update each flakes position
  snow.forEach(function (obj) {
    let y = obj.flake.position.y;
    let diff = timeDelta * (obj.velocity / 1000);
    obj.flake.position.y = y - diff < 0 ? 30 : y - diff;

    let x = obj.flake.position.x;
    obj.flake.position.x = x - diff < -60 ? 60 : x - diff;
  });

  // move the arm up and down

  if (count == 25 || count == 0) speed *= -1;
  count += speed;
  rightArm.rotateZ(-0.0003 * timeDelta * speed * 2.5);
  rightArm.position.x -= 0.002 * timeDelta * speed * 2.5;

  // render the scene
  renderer.render(scene, camera);

  // animate
  window.requestAnimationFrame(animate);
}
// start animation loop
window.requestAnimationFrame(animate);
