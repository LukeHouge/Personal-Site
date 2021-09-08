/*jshint esversion: 6 */
// @ts-check

import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrObject } from "./libs/CS559-Framework/GrObject.js";

// define your buildings here - remember, they need to be imported
// into the "main" program

export class House1 extends GrObject {
  constructor(x, y, z, rot, name) {
    let house = new T.Group();

    // setting up geometry
    let geometry1 = new T.Geometry();
    geometry1.faceVertexUvs = [[]];

    // define the vertices
    geometry1.vertices.push(new T.Vector3(0, 0, 0)); // 0
    geometry1.vertices.push(new T.Vector3(0, 1, 0)); // 1
    geometry1.vertices.push(new T.Vector3(1, 1, 0)); // 2
    geometry1.vertices.push(new T.Vector3(1, 0, 0)); // 3
    geometry1.vertices.push(new T.Vector3(0, 1, 1)); // 4
    geometry1.vertices.push(new T.Vector3(0, 0, 1)); // 5
    geometry1.vertices.push(new T.Vector3(1, 0, 1)); // 6
    geometry1.vertices.push(new T.Vector3(1, 1, 1)); // 7
    geometry1.vertices.push(new T.Vector3(0.5, 1.5, 0.5)); // 8

    // define the faces

    // roof
    let f13 = new T.Face3(1, 4, 8);
    geometry1.faces.push(f13);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(1, 0),
      new T.Vector2(0, 0),
      new T.Vector2(1 / 2, 1),
    ]);
    let f14 = new T.Face3(2, 1, 8);
    geometry1.faces.push(f14);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(1, 0),
      new T.Vector2(0, 0),
      new T.Vector2(1 / 2, 1),
    ]);
    let f15 = new T.Face3(7, 2, 8);
    geometry1.faces.push(f15);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(1, 0),
      new T.Vector2(0, 0),
      new T.Vector2(1 / 2, 1),
    ]);
    let f16 = new T.Face3(4, 7, 8);
    geometry1.faces.push(f16);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(1, 0),
      new T.Vector2(0, 0),
      new T.Vector2(1 / 2, 1),
    ]);

    // update
    geometry1.computeFaceNormals();
    geometry1.uvsNeedUpdate = true;

    // create the material and mesh
    let t1 = new T.TextureLoader().load("./images/buildings/roof2.jpg");
    let material1 = new T.MeshStandardMaterial({ map: t1, roughness: 0.75 });
    let mesh1 = new T.Mesh(geometry1, material1);

    house.add(mesh1);

    // setting up geometry2
    let geometry2 = new T.Geometry();
    geometry2.faceVertexUvs = [[]];

    // define the vertices
    geometry2.vertices.push(new T.Vector3(0, 0, 0)); // 0
    geometry2.vertices.push(new T.Vector3(0, 1, 0)); // 1
    geometry2.vertices.push(new T.Vector3(1, 1, 0)); // 2
    geometry2.vertices.push(new T.Vector3(1, 0, 0)); // 3
    geometry2.vertices.push(new T.Vector3(0, 1, 1)); // 4
    geometry2.vertices.push(new T.Vector3(0, 0, 1)); // 5
    geometry2.vertices.push(new T.Vector3(1, 0, 1)); // 6
    geometry2.vertices.push(new T.Vector3(1, 1, 1)); // 7
    geometry2.vertices.push(new T.Vector3(0.5, 1.5, 0.5)); // 8

    // define the faces
    // front (1)
    let f5 = new T.Face3(4, 5, 6);
    geometry2.faces.push(f5);
    geometry2.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);

    let f6 = new T.Face3(4, 6, 7);
    geometry2.faces.push(f6);
    geometry2.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);

    // update
    geometry2.computeFaceNormals();
    geometry2.uvsNeedUpdate = true;

    // create the material and mesh
    let t2 = new T.TextureLoader().load("./images/buildings/house2-front.png");
    let material2 = new T.MeshStandardMaterial({ map: t2, roughness: 0.75 });
    let mesh2 = new T.Mesh(geometry2, material2);

    house.add(mesh2);

    // setting up geometry3
    let geometry3 = new T.Geometry();
    geometry3.faceVertexUvs = [[]];

    // define the vertices
    geometry3.vertices.push(new T.Vector3(0, 0, 0)); // 0
    geometry3.vertices.push(new T.Vector3(0, 1, 0)); // 1
    geometry3.vertices.push(new T.Vector3(1, 1, 0)); // 2
    geometry3.vertices.push(new T.Vector3(1, 0, 0)); // 3
    geometry3.vertices.push(new T.Vector3(0, 1, 1)); // 4
    geometry3.vertices.push(new T.Vector3(0, 0, 1)); // 5
    geometry3.vertices.push(new T.Vector3(1, 0, 1)); // 6
    geometry3.vertices.push(new T.Vector3(1, 1, 1)); // 7
    geometry3.vertices.push(new T.Vector3(0.5, 1.5, 0.5)); // 8

    // define the faces
    // back (6)
    let f1 = new T.Face3(0, 1, 2);
    geometry3.faces.push(f1);
    geometry3.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    let f2 = new T.Face3(0, 2, 3);
    geometry3.faces.push(f2);
    geometry3.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);
    // left (2)
    let f3 = new T.Face3(1, 0, 5);
    geometry3.faces.push(f3);
    geometry3.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);

    let f4 = new T.Face3(1, 5, 4);
    geometry3.faces.push(f4);
    geometry3.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);

    // right (5)
    let f7 = new T.Face3(6, 3, 2);
    geometry3.faces.push(f7);
    geometry3.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);

    let f8 = new T.Face3(7, 6, 2);
    geometry3.faces.push(f8);
    geometry3.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 1),
    ]);

    // update
    geometry3.computeFaceNormals();
    geometry3.uvsNeedUpdate = true;

    // create the material and mesh
    let t3 = new T.TextureLoader().load("./images/buildings/house2-sides.png");
    let material3 = new T.MeshStandardMaterial({ map: t3, roughness: 0.75 });
    let mesh3 = new T.Mesh(geometry3, material3);

    house.add(mesh3);

    house.position.x = x;
    house.position.y = y;
    house.position.z = z;

    house.rotateY(rot);

    house.scale.set(2, 2, 2);

    super(name, house);
  }
}

export class House2 extends GrObject {
  constructor(x, y, z, rot, name) {
    let house = new T.Group();

    // setting up geometry1
    let geometry1 = new T.Geometry();
    geometry1.faceVertexUvs = [[]];

    // define the vertices
    // front cube
    geometry1.vertices.push(new T.Vector3(1, 0, 0)); // 0
    geometry1.vertices.push(new T.Vector3(1, 0, -1)); // 1
    geometry1.vertices.push(new T.Vector3(2, 0, -1)); // 2
    geometry1.vertices.push(new T.Vector3(2, 0, 0)); // 3
    geometry1.vertices.push(new T.Vector3(1, 1, 0)); // 4
    geometry1.vertices.push(new T.Vector3(1, 1, -1)); // 5
    geometry1.vertices.push(new T.Vector3(2, 1, -1)); // 6
    geometry1.vertices.push(new T.Vector3(2, 1, 0)); // 7

    // back big cube
    geometry1.vertices.push(new T.Vector3(0, 0, -1)); // 8
    geometry1.vertices.push(new T.Vector3(0, 0, -2)); // 9
    geometry1.vertices.push(new T.Vector3(3, 0, -2)); // 10
    geometry1.vertices.push(new T.Vector3(3, 0, -1)); // 11
    geometry1.vertices.push(new T.Vector3(0, 1, -1)); // 12
    geometry1.vertices.push(new T.Vector3(0, 1, -2)); // 13
    geometry1.vertices.push(new T.Vector3(3, 1, -2)); // 14
    geometry1.vertices.push(new T.Vector3(3, 1, -1)); // 15

    // back roof
    geometry1.vertices.push(new T.Vector3(3, 1.5, -1.5)); // 16
    geometry1.vertices.push(new T.Vector3(0, 1.5, -1.5)); // 17

    // front roof
    geometry1.vertices.push(new T.Vector3(1.5, 1.5, -1 / 2)); // 18
    geometry1.vertices.push(new T.Vector3(1.5, 1.5, -1.5)); // 19

    // define the faces
    // front left
    let f1 = new T.Face3(5, 1, 0);
    geometry1.faces.push(f1);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(4 / 10, 1 / 2),
      new T.Vector2(4 / 10, 0),
      new T.Vector2(5 / 10, 0),
    ]);
    let f2 = new T.Face3(5, 0, 4);
    geometry1.faces.push(f2);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(4 / 10, 1 / 2),
      new T.Vector2(5 / 10, 0),
      new T.Vector2(5 / 10, 1 / 2),
    ]);

    // front
    let f3 = new T.Face3(4, 0, 3);
    geometry1.faces.push(f3);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(3 / 10, 1 / 2),
      new T.Vector2(3 / 10, 0),
      new T.Vector2(4 / 10, 0),
    ]);
    let f4 = new T.Face3(4, 3, 7);
    geometry1.faces.push(f4);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(3 / 10, 1 / 2),
      new T.Vector2(4 / 10, 0),
      new T.Vector2(4 / 10, 1 / 2),
    ]);

    // front right
    let f7 = new T.Face3(7, 3, 2);
    geometry1.faces.push(f7);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(2 / 10, 1 / 2),
      new T.Vector2(2 / 10, 0),
      new T.Vector2(3 / 10, 0),
    ]);
    let f8 = new T.Face3(7, 2, 6);
    geometry1.faces.push(f8);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(2 / 10, 1 / 2),
      new T.Vector2(3 / 10, 0),
      new T.Vector2(3 / 10, 1 / 2),
    ]);

    // back half front right
    let f9 = new T.Face3(6, 2, 11);
    geometry1.faces.push(f9);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(1 / 10, 1 / 2),
      new T.Vector2(1 / 10, 0),
      new T.Vector2(2 / 10, 0),
    ]);
    let f10 = new T.Face3(6, 11, 15);
    geometry1.faces.push(f10);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(1 / 10, 1 / 2),
      new T.Vector2(2 / 10, 0),
      new T.Vector2(2 / 10, 1 / 2),
    ]);

    // back half front left
    let f28 = new T.Face3(12, 8, 1);
    geometry1.faces.push(f28);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(5 / 10, 1 / 2),
      new T.Vector2(5 / 10, 0),
      new T.Vector2(6 / 10, 0),
    ]);
    let f29 = new T.Face3(12, 1, 5);
    geometry1.faces.push(f29);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(5 / 10, 1 / 2),
      new T.Vector2(6 / 10, 0),
      new T.Vector2(6 / 10, 1 / 2),
    ]);

    // back half left
    let f11 = new T.Face3(13, 9, 8);
    geometry1.faces.push(f11);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(6 / 10, 1 / 2),
      new T.Vector2(6 / 10, 0),
      new T.Vector2(7 / 10, 0),
    ]);
    let f12 = new T.Face3(13, 8, 12);
    geometry1.faces.push(f12);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(6 / 10, 1 / 2),
      new T.Vector2(7 / 10, 0),
      new T.Vector2(7 / 10, 1 / 2),
    ]);

    // back half back
    let f13 = new T.Face3(14, 10, 9);
    geometry1.faces.push(f13);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(7 / 10, 1 / 2),
      new T.Vector2(7 / 10, 0),
      new T.Vector2(1, 0),
    ]);
    let f14 = new T.Face3(14, 9, 13);
    geometry1.faces.push(f14);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(7 / 10, 1 / 2),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1 / 2),
    ]);

    // back half right
    let f15 = new T.Face3(15, 11, 10);
    geometry1.faces.push(f15);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(0, 1 / 2),
      new T.Vector2(0, 0),
      new T.Vector2(1 / 10, 0),
    ]);
    let f16 = new T.Face3(15, 10, 14);
    geometry1.faces.push(f16);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(0, 1 / 2),
      new T.Vector2(1 / 10, 0),
      new T.Vector2(1 / 10, 1 / 2),
    ]);

    // back half front roof
    let f17 = new T.Face3(17, 12, 15);
    geometry1.faces.push(f17);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(7 / 10, 1), // top left
      new T.Vector2(7 / 10, 1 / 2), // bottom left
      new T.Vector2(1, 1 / 2), // bottom right
    ]);
    let f18 = new T.Face3(17, 15, 16);
    geometry1.faces.push(f18);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(7 / 10, 1), // top left
      new T.Vector2(1, 1 / 2), // bottom right
      new T.Vector2(1, 1), // top right
    ]);

    // back half back roof
    let f19 = new T.Face3(13, 17, 14);
    geometry1.faces.push(f19);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(7 / 10, 1 / 2), // bottom right
      new T.Vector2(7 / 10, 1), // top right
      new T.Vector2(1, 1 / 2), // bottom left
    ]);
    let f20 = new T.Face3(16, 14, 17);
    geometry1.faces.push(f20);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(7 / 10, 1), // top left
      new T.Vector2(7 / 10, 1 / 2), // bottom left
      new T.Vector2(1, 1), // top right
    ]);

    // back half roof left side
    let f21 = new T.Face3(12, 17, 13);
    geometry1.faces.push(f21);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(7 / 10, 1 / 2), // front right
      new T.Vector2(6.5 / 10, 1), // top
      new T.Vector2(6 / 10, 1 / 2), // front left
    ]);

    // back half roof right side
    let f22 = new T.Face3(14, 16, 15);
    geometry1.faces.push(f22);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(1 / 10, 1 / 2), // bottom right
      new T.Vector2(0.5 / 10, 1), // top
      new T.Vector2(0, 1 / 2), // bottom left
    ]);

    // front roof front side
    let f23 = new T.Face3(7, 18, 4);
    geometry1.faces.push(f23);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(4 / 10, 1 / 2), // front right
      new T.Vector2(4.5 / 10, 1), // top
      new T.Vector2(5 / 10, 1 / 2), // front left
    ]);

    // front roof left side
    let f24 = new T.Face3(4, 18, 19);
    geometry1.faces.push(f24);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(5 / 10, 1 / 2), // bottom right
      new T.Vector2(5 / 10, 1), // top right
      new T.Vector2(4 / 10, 1), // top left
    ]);
    let f25 = new T.Face3(4, 19, 5);
    geometry1.faces.push(f25);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(5 / 10, 1 / 2), // bottom right
      new T.Vector2(4 / 10, 1), // top left
      new T.Vector2(4 / 10, 1 / 2), // bottom left
    ]);

    // front roof right side
    let f26 = new T.Face3(19, 18, 7);
    geometry1.faces.push(f26);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(3 / 10, 1), // top right
      new T.Vector2(2 / 10, 1), // top left
      new T.Vector2(2 / 10, 1 / 2), // bottom left
    ]);
    let f27 = new T.Face3(6, 19, 7);
    geometry1.faces.push(f27);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(3 / 10, 1 / 2), // bottom right
      new T.Vector2(3 / 10, 1), // top right
      new T.Vector2(2 / 10, 1 / 2), // bottom left
    ]);

    // update
    geometry1.computeFaceNormals();
    geometry1.uvsNeedUpdate = true;

    // create the material and mesh
    let t1 = new T.TextureLoader().load("./images/buildings/House2Wrap.png");
    let material1 = new T.MeshStandardMaterial({ map: t1, roughness: 0.75 });
    let mesh1 = new T.Mesh(geometry1, material1);

    house.add(mesh1);

    house.position.x = x;
    house.position.y = y;
    house.position.z = z;

    house.rotateY(rot);

    house.scale.set(2, 2, 2);

    super(name, house);
  }
}

export class Tree extends GrObject {
  constructor(x, y, z, name) {
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

    tree.position.x = x;
    tree.position.y = y;
    tree.position.z = z;

    tree.scale.set(0.15, 0.15, 0.15);

    super(name, tree);
  }
}

export class Theater extends GrObject {
  constructor(x, y, z) {
    let theater = new T.Group();

    // setting up geometry1
    let geometry1 = new T.Geometry();
    geometry1.faceVertexUvs = [[]];

    // define the vertices
    // front cube
    geometry1.vertices.push(new T.Vector3(1, 0, -3 / 4)); // 0
    geometry1.vertices.push(new T.Vector3(1, 0, -1)); // 1
    geometry1.vertices.push(new T.Vector3(2, 0, -1)); // 2
    geometry1.vertices.push(new T.Vector3(2, 0, -3 / 4)); // 3
    geometry1.vertices.push(new T.Vector3(1, 1, -3 / 4)); // 4
    geometry1.vertices.push(new T.Vector3(1, 1, -1)); // 5
    geometry1.vertices.push(new T.Vector3(2, 1, -1)); // 6
    geometry1.vertices.push(new T.Vector3(2, 1, -3 / 4)); // 7

    // back big cube
    geometry1.vertices.push(new T.Vector3(0.5, 0, -1)); // 8
    geometry1.vertices.push(new T.Vector3(0.5, 0, -2)); // 9
    geometry1.vertices.push(new T.Vector3(2.5, 0, -2)); // 10
    geometry1.vertices.push(new T.Vector3(2.5, 0, -1)); // 11
    geometry1.vertices.push(new T.Vector3(0.5, 1, -1)); // 12
    geometry1.vertices.push(new T.Vector3(0.5, 1, -2)); // 13
    geometry1.vertices.push(new T.Vector3(2.5, 1, -2)); // 14
    geometry1.vertices.push(new T.Vector3(2.5, 1, -1)); // 15

    // back roof
    geometry1.vertices.push(new T.Vector3(2.5, 1.5, -1.5)); // 16
    geometry1.vertices.push(new T.Vector3(0.5, 1.5, -1.5)); // 17

    // front roof
    geometry1.vertices.push(new T.Vector3(1.5, 1.5, -1 / 2)); // 18
    geometry1.vertices.push(new T.Vector3(1.5, 1.5, -1.5)); // 19

    // define the faces
    // front left
    let f1 = new T.Face3(5, 1, 0);
    geometry1.faces.push(f1);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(2.75 / 6.5, 1),
      new T.Vector2(2.75 / 6.5, 0),
      new T.Vector2(3 / 6.5, 0),
    ]);
    let f2 = new T.Face3(5, 0, 4);
    geometry1.faces.push(f2);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(2.75 / 6.5, 1),
      new T.Vector2(3 / 6.5, 0),
      new T.Vector2(3 / 6.5, 1),
    ]);

    // front
    let f3 = new T.Face3(4, 0, 3);
    geometry1.faces.push(f3);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(1.75 / 6.5, 1),
      new T.Vector2(1.75 / 6.5, 0),
      new T.Vector2(2.75 / 6.5, 0),
    ]);
    let f4 = new T.Face3(4, 3, 7);
    geometry1.faces.push(f4);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(1.75 / 6.5, 1),
      new T.Vector2(2.75 / 6.5, 0),
      new T.Vector2(2.75 / 6.5, 1),
    ]);

    // front right
    let f7 = new T.Face3(7, 3, 2);
    geometry1.faces.push(f7);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(1.5 / 6.5, 1),
      new T.Vector2(1.5 / 6.5, 0),
      new T.Vector2(1.75 / 6.5, 0),
    ]);
    let f8 = new T.Face3(7, 2, 6);
    geometry1.faces.push(f8);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(1.5 / 6.5, 1),
      new T.Vector2(1.75 / 6.5, 0),
      new T.Vector2(1.75 / 6.5, 1),
    ]);

    // back half front right
    let f9 = new T.Face3(6, 2, 11);
    geometry1.faces.push(f9);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(1 / 6.5, 1),
      new T.Vector2(1 / 6.5, 0),
      new T.Vector2(1.5 / 6.5, 0),
    ]);
    let f10 = new T.Face3(6, 11, 15);
    geometry1.faces.push(f10);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(1 / 6.5, 1),
      new T.Vector2(1.5 / 6.5, 0),
      new T.Vector2(1.5 / 6.5, 1),
    ]);

    // back half front left
    let f28 = new T.Face3(12, 8, 1);
    geometry1.faces.push(f28);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(3 / 6.5, 1),
      new T.Vector2(3 / 6.5, 0),
      new T.Vector2(3.5 / 6.5, 0),
    ]);
    let f29 = new T.Face3(12, 1, 5);
    geometry1.faces.push(f29);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(3 / 6.5, 1),
      new T.Vector2(3.5 / 6.5, 0),
      new T.Vector2(3.5 / 6.5, 1),
    ]);

    // back half left
    let f11 = new T.Face3(13, 9, 8);
    geometry1.faces.push(f11);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(3.5 / 6.5, 1),
      new T.Vector2(3.5 / 6.5, 0),
      new T.Vector2(4.5 / 6.5, 0),
    ]);
    let f12 = new T.Face3(13, 8, 12);
    geometry1.faces.push(f12);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(3.5 / 6.5, 1),
      new T.Vector2(4.5 / 6.5, 0),
      new T.Vector2(4.5 / 6.5, 1),
    ]);

    // back half back
    let f13 = new T.Face3(14, 10, 9);
    geometry1.faces.push(f13);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(4.5 / 6.5, 1),
      new T.Vector2(4.5 / 6.5, 0),
      new T.Vector2(1, 0),
    ]);
    let f14 = new T.Face3(14, 9, 13);
    geometry1.faces.push(f14);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(4.5 / 6.5, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);

    // back half right
    let f15 = new T.Face3(15, 11, 10);
    geometry1.faces.push(f15);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1 / 6.5, 0),
    ]);
    let f16 = new T.Face3(15, 10, 14);
    geometry1.faces.push(f16);
    geometry1.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1 / 6.5, 0),
      new T.Vector2(1 / 6.5, 1),
    ]);
    // update
    geometry1.computeFaceNormals();
    geometry1.uvsNeedUpdate = true;

    // create the material and mesh
    let t1 = new T.TextureLoader().load("./images/buildings/theaterWrap.png");
    let material1 = new T.MeshStandardMaterial({ map: t1, roughness: 0.75 });
    let mesh1 = new T.Mesh(geometry1, material1);

    theater.add(mesh1);

    // setting up geometry2
    let geometry2 = new T.Geometry();
    geometry2.faceVertexUvs = [[]];

    // front triangle
    geometry2.vertices.push(new T.Vector3(1, 0.4, -3 / 4)); // 0
    geometry2.vertices.push(new T.Vector3(1, 0.6, -3 / 4)); // 1
    geometry2.vertices.push(new T.Vector3(1.5, 0.4, -1 / 4)); // 2
    geometry2.vertices.push(new T.Vector3(1.5, 0.6, -1 / 4)); // 3
    geometry2.vertices.push(new T.Vector3(2, 0.4, -3 / 4)); // 4
    geometry2.vertices.push(new T.Vector3(2, 0.6, -3 / 4)); // 5

    // front triangle left
    let f32 = new T.Face3(1, 0, 2);
    geometry2.faces.push(f32);
    geometry2.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1 / 2, 0),
    ]);
    let f33 = new T.Face3(1, 2, 3);
    geometry2.faces.push(f33);
    geometry2.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1 / 2, 0),
      new T.Vector2(1 / 2, 1),
    ]);
    // front triangle right
    let f34 = new T.Face3(2, 4, 5);
    geometry2.faces.push(f34);
    geometry2.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1 / 2, 0),
      new T.Vector2(1 / 2, 1),
    ]);
    let f35 = new T.Face3(3, 2, 5);
    geometry2.faces.push(f35);
    geometry2.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1 / 2, 1),
    ]);

    // update
    geometry2.computeFaceNormals();
    geometry2.uvsNeedUpdate = true;

    // create the material and mesh
    let t2 = new T.TextureLoader().load(
      "./images/buildings/frontTriangleWrap.png"
    );
    let material2 = new T.MeshStandardMaterial({ map: t2, roughness: 0.75 });
    let mesh2 = new T.Mesh(geometry2, material2);

    theater.add(mesh2);

    // setting up geometry3
    let geometry3 = new T.Geometry();
    geometry3.faceVertexUvs = [[]];

    geometry3.vertices.push(new T.Vector3(1, 0.4, -3 / 4)); // 20
    geometry3.vertices.push(new T.Vector3(1, 0.6, -3 / 4)); // 21
    geometry3.vertices.push(new T.Vector3(1.5, 0.4, -1 / 4)); // 22
    geometry3.vertices.push(new T.Vector3(1.5, 0.6, -1 / 4)); // 23
    geometry3.vertices.push(new T.Vector3(2, 0.4, -3 / 4)); // 24
    geometry3.vertices.push(new T.Vector3(2, 0.6, -3 / 4)); // 25

    geometry3.vertices.push(new T.Vector3(1, 1, -3 / 4)); // 6
    geometry3.vertices.push(new T.Vector3(1, 1, -1)); // 7
    geometry3.vertices.push(new T.Vector3(2, 1, -1)); // 8
    geometry3.vertices.push(new T.Vector3(2, 1, -3 / 4)); // 9

    // back big cube
    geometry3.vertices.push(new T.Vector3(0.5, 1, -1)); // 10
    geometry3.vertices.push(new T.Vector3(0.5, 1, -2)); // 11
    geometry3.vertices.push(new T.Vector3(2.5, 1, -2)); // 12
    geometry3.vertices.push(new T.Vector3(2.5, 1, -1)); // 13

    // roof
    // front triangle top
    let f30 = new T.Face3(1, 3, 5);
    geometry3.faces.push(f30);
    geometry3.faceVertexUvs[0].push([
      new T.Vector2(0, 1 / 2),
      new T.Vector2(0, 0),
      new T.Vector2(1 / 2, 0),
    ]);
    // front triangle bottom
    let f31 = new T.Face3(0, 2, 4);
    geometry3.faces.push(f31);
    geometry3.faceVertexUvs[0].push([
      new T.Vector2(0, 1 / 2),
      new T.Vector2(0, 0),
      new T.Vector2(1 / 2, 0),
    ]);

    // front roof
    let f36 = new T.Face3(8, 7, 6);
    geometry3.faces.push(f36);
    geometry3.faceVertexUvs[0].push([
      new T.Vector2(1 / 4, 2 / 10),
      new T.Vector2(3 / 4, 0),
      new T.Vector2(3 / 4, 2 / 10),
    ]);
    let f37 = new T.Face3(9, 8, 6);
    geometry3.faces.push(f37);
    geometry3.faceVertexUvs[0].push([
      new T.Vector2(1 / 4, 2 / 10),
      new T.Vector2(1 / 4, 0),
      new T.Vector2(3 / 4, 0),
    ]);
    // rear roof
    let f38 = new T.Face3(12, 11, 10);
    geometry3.faces.push(f38);
    geometry3.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
    ]);
    let f39 = new T.Face3(12, 10, 13);
    geometry3.faces.push(f39);
    geometry3.faceVertexUvs[0].push([
      new T.Vector2(0, 1),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
    ]);

    // update
    geometry3.computeFaceNormals();
    geometry3.uvsNeedUpdate = true;

    // create the material and mesh
    let t3 = new T.TextureLoader().load("./images/buildings/theaterRoof.png");
    let material3 = new T.MeshStandardMaterial({ map: t3, roughness: 0.75 });
    let mesh3 = new T.Mesh(geometry3, material3);

    theater.add(mesh3);

    theater.rotateY(Math.PI / 2);

    theater.position.x = x;
    theater.position.y = y;
    theater.position.z = z;

    theater.scale.set(5, 5, 5);

    super("Theater", theater);
  }
}
