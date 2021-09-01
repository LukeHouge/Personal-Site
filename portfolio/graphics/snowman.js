import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrObject } from "./libs/CS559-Framework/GrObject.js";
import { MathUtils } from "./libs/CS559-Three/build/three.module.js";

// define your buildings here - remember, they need to be imported
// into the "main" program

// define materials to reuse
let blackMat = new T.MeshStandardMaterial({ color: 0x000000, roughness: 0 });
let whiteMat = new T.MeshStandardMaterial({ color: 0xffffff });

export class Snowman1 extends GrObject {
  constructor(x, y, z) {
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

    snowman1.translateX(x);
    snowman1.translateY(y);
    snowman1.translateZ(z);

    // add snowman to world
    super("Snowman1", snowman1);
  }
}

export class Snowman2 extends GrObject {
  constructor(x, y, z) {
    /***********************************
     * make second snowman
     ***********************************/
    let snowman2 = new T.Group();
    let body = new T.Group();
    let face = new T.Group();

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
    let eye1 = new T.Mesh(new T.BoxGeometry(0.3, 0.3, 0.2), blackMat);
    let eye2 = eye1.clone();

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
    let mouth = [];
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
      new T.BoxGeometry(3, 0.2, 3),
      new T.MeshStandardMaterial({ color: 0x646464 })
    );
    ring.position.y = 9.5; // position the ring
    face.add(ring); // add to face group

    // define the hat
    let cylinder = new T.Mesh(
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

    snowman2.translateX(x);
    snowman2.translateY(y);
    snowman2.translateZ(z);

    // add snowman to world
    super("Snowman2", snowman2);
  }
}
