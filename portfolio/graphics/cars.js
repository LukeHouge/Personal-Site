/*jshint esversion: 6 */
// @ts-check
import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrObject } from "./libs/CS559-Framework/GrObject.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program

export class Car extends GrObject {
  constructor(x, y, z, rot, name) {
    let car = new T.Group();

    let backMaterial = new T.MeshPhongMaterial({
      color: "#877B7F",
      specular: "#FFF",
      shininess: 100,
    });
    let back = new T.Mesh(new T.BoxGeometry(5, 1.5, 1.2), backMaterial);
    back.position.y = 1.5;
    car.add(back);

    let axleMat = new T.MeshStandardMaterial({ color: "#171717" });
    let axle = new T.Mesh(new T.BoxGeometry(5, 0.5, 0.75), axleMat);
    axle.position.y = 0.5;
    car.add(axle);

    let wheelMat = new T.MeshStandardMaterial({ color: "#171717" });
    let wheel = new T.Mesh(new T.CylinderGeometry(0.35, 0.35, 0.3, 32, 32), wheelMat);
    wheel.position.y = 0.35;
    wheel.position.z = 0.5;
    wheel.position.x = 2.1;
    wheel.rotateX(Math.PI / 2);
    car.add(wheel);

    let wheel2 = wheel.clone();
    wheel2.position.x = 1.4;
    car.add(wheel2);

    let wheel3 = wheel.clone();
    wheel3.position.x = -2.1;
    car.add(wheel3);

    let wheel4 = wheel.clone();
    wheel4.position.x = -1.4;
    car.add(wheel4);

    let wheel5 = wheel.clone();
    wheel5.position.z = -0.5;
    car.add(wheel5);

    let wheel6 = wheel2.clone();
    wheel6.position.z = -0.5;
    car.add(wheel6);

    let wheel7 = wheel3.clone();
    wheel7.position.z = -0.5;
    car.add(wheel7);

    let wheel8 = wheel4.clone();
    wheel8.position.z = -0.5;
    car.add(wheel8);

    let wheel9 = wheel.clone();
    wheel9.position.x = -3.5;
    wheel9.position.z = 0.6;
    car.add(wheel9);

    let wheel10 = wheel9.clone();
    wheel10.position.z = -0.6;
    car.add(wheel10);

    const frontShape = new T.Shape();

    frontShape.moveTo(0, 0.2);
    frontShape.lineTo(0, 2);
    frontShape.bezierCurveTo(-2 / 3, 2, -4 / 3, 1, -2, -0.2);
    frontShape.lineTo(-0.4, 0);
    frontShape.lineTo(-0.2, 0);
    frontShape.lineTo(0, 0.2);

    const extrudeSettings = {
      steps: 2,
      depth: 1.2,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 100,
    };

    const geometry = new T.ExtrudeGeometry(frontShape, extrudeSettings);
    let frontMat = new T.MeshPhongMaterial({
      color: "#3926AA",
      specular: "white",
      shininess: 100,
    });
    let front = new T.Mesh(geometry, frontMat);
    front.position.y = 0.75;
    front.position.x = -2.9;
    front.position.z = -0.6;
    front.scale.set(0.5, 0.5, 1);
    car.translateX(x);
    car.translateY(y);
    car.translateZ(z);
    car.add(front);
    car.rotateY(rot);

    super(name, car);
  }
}

export class Car2 extends GrObject {
  constructor(x, y, z, name, size) {
    let car2 = new T.Group();

    const bottomShape = new T.Shape();

    bottomShape.moveTo(0, 0);
    bottomShape.lineTo(-0.025, 0.5);
    bottomShape.lineTo(5, 1);
    bottomShape.lineTo(4.75, 0);
    bottomShape.lineTo(0, 0);

    const extrudeSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: false,
      bevelThickness: 0.1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 100,
    };

    const geometry = new T.ExtrudeGeometry(bottomShape, extrudeSettings);
    let bottomMat = new T.MeshPhongMaterial({
      color: "#52565F",
      specular: "#FFF",
      shininess: 100,
    });
    let bottom = new T.Mesh(geometry, bottomMat);
    car2.add(bottom);

    const topShape = new T.Shape();

    topShape.moveTo(5, 1);
    topShape.lineTo(2, 1.5);
    topShape.lineTo(0, 0.5);

    const geometry2 = new T.ExtrudeGeometry(topShape, extrudeSettings);
    let topMat = new T.MeshPhongMaterial({
      color: "#B3BCC3",
      specular: "#FFF",
      shininess: 100,
    });
    let top = new T.Mesh(geometry2, topMat);
    car2.add(top);

    const window1shape = new T.Shape();

    window1shape.moveTo(3, 1.2);
    window1shape.lineTo(2, 1.4);
    window1shape.lineTo(0.5, 0.65);
    window1shape.lineTo(3, 0.9);

    const extrudeSettings2 = {
      steps: 2,
      depth: 2.1,
      bevelEnabled: false,
      bevelThickness: 0.1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 100,
    };

    const geometry3 = new T.ExtrudeGeometry(window1shape, extrudeSettings2);
    let material3 = new T.MeshStandardMaterial({ color: "black", roughness: 0.1 });
    let window1 = new T.Mesh(geometry3, material3);
    car2.add(window1);
    window1.translateZ(-0.05);

    // setting up geometry3
    let geometry4 = new T.Geometry();
    geometry4.faceVertexUvs = [[]];

    geometry4.vertices.push(new T.Vector3(1.75, 1.25, 2.08));
    geometry4.vertices.push(new T.Vector3(1.75, 0.9, 2.08));
    geometry4.vertices.push(new T.Vector3(2.25, 0.9, 2.08));
    geometry4.vertices.push(new T.Vector3(2.25, 1.25, 2.08));

    let f1 = new T.Face3(0, 1, 2);
    geometry4.faces.push(f1);
    geometry4.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    let f2 = new T.Face3(0, 2, 3);
    geometry4.faces.push(f2);
    geometry4.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);
    // update
    geometry4.computeFaceNormals();
    geometry4.uvsNeedUpdate = true;

    // create the material and mesh
    let t = new T.TextureLoader().load("./images/buildings/crack.jpg");
    let material4 = new T.MeshStandardMaterial({ map: t, roughness: 0.75 });
    let mesh3 = new T.Mesh(geometry4, material4);

    car2.add(mesh3);

    let wheelMat = new T.MeshStandardMaterial({ color: "#171717" });
    let wheel = new T.Mesh(new T.CylinderGeometry(0.5, 0.5, 0.3, 32, 32), wheelMat);
    wheel.position.z = 2;
    wheel.position.x = 1;
    wheel.rotateX(Math.PI / 2);
    car2.add(wheel);

    let wheel2 = wheel.clone();
    wheel2.position.x = 4;
    car2.add(wheel2);

    let wheel3 = wheel.clone();
    wheel3.position.z = 0;
    car2.add(wheel3);

    let wheel4 = wheel2.clone();
    wheel4.position.z = 0;
    car2.add(wheel4);

    car2.position.x = x;
    car2.position.y = y;
    car2.position.z = z;

    car2.scale.set(size, size, size);

    super(name, car2);
  }
}
