/*jshint esversion: 6 */
// @ts-check

import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrObject } from "./libs/CS559-Framework/GrObject.js";
import * as Loaders from "./libs/CS559-Framework/loaders.js";

function degreesToRadians(deg) {
  return (deg * Math.PI) / 180;
}

let craneObCtr = 0;

// A simple crane
/**
 * @typedef CraneProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCrane extends GrObject {
  /**
   * @param {CraneProperties} params
   */
  constructor(params = {}) {
    let crane = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.5,
      bevelEnabled: false,
    };

    // first, we define the base of the crane.
    // Just draw a curve for the shape, then use three's "ExtrudeGeometry"
    // to create the shape itself.
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-0.5, 0);
    base_curve.lineTo(-0.5, 2);
    base_curve.lineTo(-0.25, 2.25);
    base_curve.lineTo(-0.25, 5);
    base_curve.lineTo(-0.2, 5);
    base_curve.lineTo(-0.2, 5.5);
    base_curve.lineTo(0.2, 5.5);
    base_curve.lineTo(0.2, 5);
    base_curve.lineTo(0.25, 5);
    base_curve.lineTo(0.25, 2.25);
    base_curve.lineTo(0.5, 2);
    base_curve.lineTo(0.5, 0);
    base_curve.lineTo(-0.5, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let crane_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7,
    });
    let base = new T.Mesh(base_geom, crane_mat);
    crane.add(base);
    base.translateZ(-0.25);

    // Use a similar process to create the cross-arm.
    // Note, we create a group for the arm, and move it to the proper position.
    // This ensures rotations will behave nicely,
    // and we just have that one point to work with for animation/sliders.
    let arm_group = new T.Group();
    crane.add(arm_group);
    arm_group.translateY(4.5);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-1.5, 0);
    arm_curve.lineTo(-1.5, 0.25);
    arm_curve.lineTo(-0.5, 0.5);
    arm_curve.lineTo(4, 0.4);
    arm_curve.lineTo(4, 0);
    arm_curve.lineTo(-1.5, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm = new T.Mesh(arm_geom, crane_mat);
    arm_group.add(arm);
    arm.translateZ(-0.25);

    // Finally, add the hanging "wire" for the crane arm,
    // which is what carries materials in a real crane.
    // The extrusion makes this not look very wire-like, but that's fine for what we're doing.
    let wire_group = new T.Group();
    arm_group.add(wire_group);
    wire_group.translateX(3);
    let wire_curve = new T.Shape();
    wire_curve.moveTo(-0.25, 0);
    wire_curve.lineTo(-0.25, -0.25);
    wire_curve.lineTo(-0.05, -0.3);
    wire_curve.lineTo(-0.05, -3);
    wire_curve.lineTo(0.05, -3);
    wire_curve.lineTo(0.05, -0.3);
    wire_curve.lineTo(0.25, -0.25);
    wire_curve.lineTo(0.25, 0);
    wire_curve.lineTo(-0.25, 0);
    let wire_geom = new T.ExtrudeGeometry(wire_curve, exSettings);
    let wire_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3,
    });
    let wire = new T.Mesh(wire_geom, wire_mat);
    wire_group.add(wire);
    wire.translateZ(-0.25);
    arm_group.rotateY(-Math.PI / 4);
    wire_group.translateX(-0.5);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // This is also where we define parameters for UI sliders.
    // These have format "name," "min", "max", "starting value."
    // Sliders are standardized to have 30 "steps" per slider,
    // so if your starting value does not fall on one of the 30 steps,
    // the starting value in the UI may be slightly different from the starting value you gave.
    super("Crane", crane, [
      ["x", -4, 4, 0],
      ["z", -4, 4, 0],
      ["theta", 0, 360, 0],
      ["wire", 1, 3.5, 2],
      ["arm rotation", 0, 360, 0],
    ]);
    // Here, we store the crane, arm, and wire groups as part of the "GrCrane" object.
    // This allows us to modify transforms as part of the update function.
    this.whole_ob = crane;
    this.arm = arm_group;
    this.wire = wire_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    crane.scale.set(scale, scale, scale);
  }

  // Wire up the wire position and arm rotation to match parameters,
  // given in the call to "super" above.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.wire.position.x = paramValues[3];
    this.arm.rotation.y = degreesToRadians(paramValues[4]);
  }
}

let excavatorObCtr = 0;

// A simple excavator
/**
 * @typedef ExcavatorProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrExcavator extends GrObject {
  /**
   * @param {ExcavatorProperties} params
   */
  constructor(params = {}) {
    let excavator = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2,
    };

    // As with the crane, we define the base (treads) of the excavator.
    // We draw a line, then extrude the line with ExtrudeGeometry,
    // to get the "cutout" style object.
    // Note, for this object, we translate each piece by 0.25 on the negative x-axis.
    // This makes rotation about the y-axis work nicely
    // (since the extrusion happens along +z, a y-rotation goes around an axis on the back face of the piece,
    //  rather than an axis through the center of the piece).
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-1, 0);
    base_curve.lineTo(-1.2, 0.2);
    base_curve.lineTo(-1.2, 0.4);
    base_curve.lineTo(-1, 0.6);
    base_curve.lineTo(1, 0.6);
    base_curve.lineTo(1.2, 0.4);
    base_curve.lineTo(1.2, 0.2);
    base_curve.lineTo(1, 0);
    base_curve.lineTo(-1, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let excavator_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7,
    });
    let base = new T.Mesh(base_geom, excavator_mat);
    excavator.add(base);
    base.translateZ(-0.2);

    // We'll add the "pedestal" piece for the cab of the excavator to sit on.
    // It can be considered a part of the treads, to some extent,
    // so it doesn't need a group of its own.
    let pedestal_curve = new T.Shape();
    pedestal_curve.moveTo(-0.35, 0);
    pedestal_curve.lineTo(-0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0);
    pedestal_curve.lineTo(-0.35, 0);
    let pedestal_geom = new T.ExtrudeGeometry(pedestal_curve, exSettings);
    let pedestal = new T.Mesh(pedestal_geom, excavator_mat);
    excavator.add(pedestal);
    pedestal.translateY(0.6);
    pedestal.translateZ(-0.2);

    // For the cab, we create a new group, since the cab should be able to spin on the pedestal.
    let cab_group = new T.Group();
    excavator.add(cab_group);
    cab_group.translateY(0.7);
    let cab_curve = new T.Shape();
    cab_curve.moveTo(-1, 0);
    cab_curve.lineTo(1, 0);
    cab_curve.lineTo(1.2, 0.35);
    cab_curve.lineTo(1, 0.75);
    cab_curve.lineTo(0.25, 0.75);
    cab_curve.lineTo(0, 1.5);
    cab_curve.lineTo(-0.8, 1.5);
    cab_curve.lineTo(-1, 1.2);
    cab_curve.lineTo(-1, 0);
    let cab_geom = new T.ExtrudeGeometry(cab_curve, exSettings);
    let cab = new T.Mesh(cab_geom, excavator_mat);
    cab_group.add(cab);
    cab.translateZ(-0.2);

    // Next up is the first part of the bucket arm.
    // In general, each piece is just a series of line segments,
    // plus a bit of extra to get the geometry built and put into a group.
    // We always treat the group as the "pivot point" around which the object should rotate.
    // It is helpful to draw the lines for extrusion with the zero at our desired "pivot point."
    // This minimizes the fiddling needed to get the piece placed correctly relative to its parent's origin.
    // The remaining few pieces are very similar to the arm piece.
    let arm_group = new T.Group();
    cab_group.add(arm_group);
    arm_group.position.set(-0.8, 0.5, 0);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-2.25, 0);
    arm_curve.lineTo(-2.35, 0.15);
    arm_curve.lineTo(-1, 0.5);
    arm_curve.lineTo(0, 0.25);
    arm_curve.lineTo(-0.2, 0);
    arm_curve.lineTo(-1, 0.3);
    arm_curve.lineTo(-2.25, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3,
    });
    let arm = new T.Mesh(arm_geom, arm_mat);
    arm_group.add(arm);
    arm.translateZ(-0.2);

    let forearm_group = new T.Group();
    arm_group.add(forearm_group);
    forearm_group.position.set(-2.1, 0, 0);
    let forearm_curve = new T.Shape();
    forearm_curve.moveTo(-1.5, 0);
    forearm_curve.lineTo(-1.5, 0.1);
    forearm_curve.lineTo(0, 0.15);
    forearm_curve.lineTo(0.15, 0);
    forearm_curve.lineTo(-1.5, 0);
    let forearm_geom = new T.ExtrudeGeometry(forearm_curve, exSettings);
    let forearm = new T.Mesh(forearm_geom, arm_mat);
    forearm_group.add(forearm);
    forearm.translateZ(-0.2);

    let bucket_group = new T.Group();
    forearm_group.add(bucket_group);
    bucket_group.position.set(-1.4, 0, 0);
    let bucket_curve = new T.Shape();
    bucket_curve.moveTo(-0.25, -0.9);
    bucket_curve.lineTo(-0.5, -0.5);
    bucket_curve.lineTo(-0.45, -0.3);
    bucket_curve.lineTo(-0.3, -0.2);
    bucket_curve.lineTo(-0.15, 0);
    bucket_curve.lineTo(0.1, 0);
    bucket_curve.lineTo(0.05, -0.2);
    bucket_curve.lineTo(0.5, -0.7);
    bucket_curve.lineTo(-0.25, -0.9);
    let bucket_geom = new T.ExtrudeGeometry(bucket_curve, exSettings);
    let bucket = new T.Mesh(bucket_geom, arm_mat);
    bucket_group.add(bucket);
    bucket.translateZ(-0.2);

    let count = 0;
    let dir = 0.01;

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // The parameters for sliders are also defined here.
    super("Excavator", excavator, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["spin", 0, 360, 0],
      ["arm rotate", 0, 50, 45],
      ["forearm rotate", 0, 90, 45],
      ["bucket rotate", -90, 45, 0],
    ]);
    // As with the crane, we save the "excavator" group as the "whole object" of the GrExcavator class.
    // We also save the groups of each object that may be manipulated by the UI.
    this.whole_ob = excavator;
    this.cab = cab_group;
    this.arm = arm_group;
    this.forearm = forearm_group;
    this.bucket = bucket_group;
    this.count = count;
    this.dir = dir;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    excavator.scale.set(scale, scale, scale);
  }

  // As with the crane, we wire up each saved group with the appropriate parameter defined in the "super" call.
  // Note, with the forearm, there is an extra bit of rotation added, which allows us to create a rotation offset,
  // while maintaining a nice 0-90 range for the slider itself.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.cab.rotation.y = degreesToRadians(paramValues[3]);
    this.arm.rotation.z = degreesToRadians(-paramValues[4]);
    this.forearm.rotation.z = degreesToRadians(paramValues[5]) + Math.PI / 16;
    this.bucket.rotation.z = degreesToRadians(paramValues[6]);
  }
  stepWorld(delta, timeOfDay) {
    this.cab.rotation.y = Math.sin(this.count);
    this.arm.rotation.z = -Math.sin(this.count);
    this.bucket.rotation.z = -2 * Math.sin(this.count);
    this.count += this.dir;
    if (this.count >= 1 || this.count <= 0) {
      this.dir *= -1;
    }
  }
}

let truckCraneObCtr = 0;
let lastVal = 0;
// A simple truckCrane
/**
 * @typedef TruckCraneProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrTruckCrane extends GrObject {
  /**
   * @param {TruckCraneProperties} params
   */
  constructor(params = {}) {
    let truckCrane = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2,
    };

    // draw the base
    /**@type THREE.Shape */
    let cab_curve = new T.Shape();
    cab_curve.moveTo(-1, 0);
    cab_curve.lineTo(1, 0);
    cab_curve.lineTo(1.2, 0.35);
    cab_curve.lineTo(1, 0.75);
    cab_curve.lineTo(0.25, 0.75);
    cab_curve.lineTo(0, 1.5);
    cab_curve.lineTo(-0.8, 1.5);
    cab_curve.lineTo(-1, 1.2);
    cab_curve.lineTo(-1, 0);
    let cab_geom = new T.ExtrudeGeometry(cab_curve, exSettings);
    cab_geom.rotateY(Math.PI);
    let truckCrane_mat = new T.MeshStandardMaterial({
      color: "#C8020D",
      metalness: 0.5,
      roughness: 0.7,
    });
    let base = new T.Mesh(cab_geom, truckCrane_mat);
    truckCrane.add(base);
    base.translateY(0.5);

    // make the bed of the truck
    let bed_group = new T.Group();
    truckCrane.add(bed_group);
    let bed_geom = new T.BoxGeometry(4, 0.5, 2.5);
    let bed = new T.Mesh(bed_geom, truckCrane_mat);
    bed_group.add(bed);
    bed.translateX(3);
    bed.translateZ(-1);
    bed.translateY(0.75);

    // add wheels
    let wheel_group = new T.Group();
    truckCrane.add(wheel_group);
    let wheel_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3,
    });
    let wheel = new T.Mesh(new T.CylinderGeometry(0.5, 0.5, 1), wheel_mat);
    wheel_group.add(wheel);
    wheel.rotateX(Math.PI / 2);
    wheel.translateZ(-0.45);

    let wheel2 = wheel.clone();
    wheel2.translateX(2);
    wheel_group.add(wheel2);

    let wheel3 = wheel.clone();
    wheel3.translateX(4);
    wheel_group.add(wheel3);

    let wheel4 = wheel.clone();
    wheel4.translateY(-2);
    wheel_group.add(wheel4);

    let wheel5 = wheel.clone();
    wheel5.translateX(2);

    wheel5.translateY(-2);
    wheel_group.add(wheel5);

    let wheel6 = wheel.clone();
    wheel6.translateX(4);

    wheel6.translateY(-2);
    wheel_group.add(wheel6);

    // Make the back (crane) cab
    let backCab_group = new T.Group();
    truckCrane.add(backCab_group);
    let backCab_curve = new T.Shape();
    backCab_curve.moveTo(-1, 0);
    backCab_curve.lineTo(1, 0);
    backCab_curve.lineTo(1.2, 0.35);
    backCab_curve.lineTo(1, 0.75);
    backCab_curve.lineTo(0.25, 0.75);
    backCab_curve.lineTo(0, 1.5);
    backCab_curve.lineTo(-0.8, 1.5);
    backCab_curve.lineTo(-1, 1.2);
    backCab_curve.lineTo(-1, 0);
    let backCab_geom = new T.ExtrudeGeometry(backCab_curve, exSettings);
    let backCab = new T.Mesh(backCab_geom, truckCrane_mat);
    backCab_group.translateZ(0);
    backCab_group.translateY(1);
    backCab_group.translateX(3.5);
    backCab.rotateY(Math.PI);
    backCab_group.add(backCab);

    // make the extendable arm
    let arm_group = new T.Group();
    backCab_group.add(arm_group);
    arm_group.position.set(-0.8, 0.5, 0);
    let arm_geom = new T.BoxGeometry(4.5, 0.5, 0.5);
    let arm_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3,
    });
    let arm = new T.Mesh(arm_geom, arm_mat);
    arm_group.add(arm);
    arm.translateX(-1);
    arm.translateZ(-1);
    arm.translateY(2);
    arm.rotateZ(degreesToRadians(-45));
    arm.translateX(1.5);

    // make the outer arm
    let forearm_group = new T.Group();
    arm_group.add(forearm_group);
    forearm_group.position.set(-2.1, 0, 0);
    let forearm_geom = new T.BoxGeometry(4, 0.75, 0.75);
    let forearm = new T.Mesh(forearm_geom, truckCrane_mat);
    forearm_group.add(forearm);
    forearm.translateX(2);
    forearm.translateZ(-1);
    forearm.translateY(1);
    forearm.rotateZ(degreesToRadians(-45));
    arm.translateX(-4);

    super("TruckCrane", truckCrane, [
      ["x", -8, 8, 0],
      ["z", -8, 8, 0],
      ["theta", 0, 360, 0],
      ["arm extension", 0, 4, 0],
      ["arm rotation", -50, 34, 0],
    ]);

    this.whole_ob = truckCrane;
    this.arm = arm_group;
    this.innerArm = arm;
    this.cab = backCab_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    truckCrane.scale.set(scale, scale, scale);
  }

  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    if (lastVal != paramValues[3]) {
      if (lastVal > paramValues[3])
        this.innerArm.translateX(-(paramValues[3] - lastVal));
      else this.innerArm.translateX(lastVal - paramValues[3]);
    }
    lastVal = paramValues[3];
    this.arm.rotation.z = degreesToRadians(paramValues[4]);
  }
}

let backhoeObCtr = 0;

// A simple backhoe
/**
 * @typedef BackhoeProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrBackhoe extends GrObject {
  /**
   * @param {BackhoeProperties} params
   */
  constructor(params = {}) {
    let backhoe = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2,
    };

    // thicker extrude for front (wider) bucket
    let exSettings2 = {
      steps: 2,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2,
    };

    // draw the base
    let cab_group = new T.Group();
    backhoe.add(cab_group);
    /**@type THREE.Shape */
    let cab_curve = new T.Shape();
    cab_curve.moveTo(-1, 0);
    cab_curve.lineTo(1, 0);
    cab_curve.lineTo(2, 0.35);
    cab_curve.lineTo(1, 0.75);
    cab_curve.lineTo(0.25, 0.75);
    cab_curve.lineTo(0, 1.5);
    cab_curve.lineTo(-0.8, 1.5);
    cab_curve.lineTo(-1, 1.2);
    cab_curve.lineTo(-1, 0);
    let cab_geom = new T.ExtrudeGeometry(cab_curve, exSettings2);
    let backhoe_mat = new T.MeshStandardMaterial({
      color: "#319197",
      metalness: 0.5,
      roughness: 0.7,
    });
    let base = new T.Mesh(cab_geom, backhoe_mat);
    backhoe.add(base);
    base.translateY(0.5);
    base.translateZ(-2);

    // add wheels
    let wheel_group = new T.Group();
    backhoe.add(wheel_group);
    let wheel_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3,
    });
    let wheel = new T.Mesh(new T.CylinderGeometry(0.4, 0.4, 0.5), wheel_mat);
    wheel_group.add(wheel);
    wheel.rotateX(Math.PI / 2);
    wheel.translateZ(-0.45);
    wheel.translateX(1.5);

    let wheel2 = wheel.clone();
    wheel2.translateY(-2);
    wheel_group.add(wheel2);

    let wheel3 = wheel.clone();
    wheel3.scale.set(1.5, 1, 1.5);
    wheel3.translateX(-2);
    wheel_group.add(wheel3);

    let wheel4 = wheel3.clone();
    wheel4.translateY(-2);
    wheel_group.add(wheel4);

    let arm_group = new T.Group();
    cab_group.add(arm_group);
    arm_group.position.set(-0.8, 0.5, -1);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-2.25, 0);
    arm_curve.lineTo(-2.35, 0.15);
    arm_curve.lineTo(-1, 0.5);
    arm_curve.lineTo(0, 0.25);
    arm_curve.lineTo(-0.2, 0);
    arm_curve.lineTo(-1, 0.3);
    arm_curve.lineTo(-2.25, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3,
    });
    let arm = new T.Mesh(arm_geom, arm_mat);
    arm_group.add(arm);
    arm.translateZ(-0.2);

    let forearm_group = new T.Group();
    arm_group.add(forearm_group);
    forearm_group.position.set(-2.1, 0, 0);
    let forearm_curve = new T.Shape();
    forearm_curve.moveTo(-1.5, 0);
    forearm_curve.lineTo(-1.5, 0.1);
    forearm_curve.lineTo(0, 0.15);
    forearm_curve.lineTo(0.15, 0);
    forearm_curve.lineTo(-1.5, 0);
    let forearm_geom = new T.ExtrudeGeometry(forearm_curve, exSettings);
    let forearm = new T.Mesh(forearm_geom, arm_mat);
    forearm_group.add(forearm);
    forearm.translateZ(-0.2);

    let bucket_group = new T.Group();
    forearm_group.add(bucket_group);
    bucket_group.position.set(-1.4, 0, 0);
    let bucket_curve = new T.Shape();
    bucket_curve.moveTo(-0.25, -0.9);
    bucket_curve.lineTo(-0.5, -0.5);
    bucket_curve.lineTo(-0.45, -0.3);
    bucket_curve.lineTo(-0.3, -0.2);
    bucket_curve.lineTo(-0.15, 0);
    bucket_curve.lineTo(0.1, 0);
    bucket_curve.lineTo(0.05, -0.2);
    bucket_curve.lineTo(0.5, -0.7);
    bucket_curve.lineTo(-0.25, -0.9);
    let bucket_geom = new T.ExtrudeGeometry(bucket_curve, exSettings);
    let bucket = new T.Mesh(bucket_geom, arm_mat);
    bucket_group.add(bucket);
    bucket.translateZ(-0.2);

    let hitch = new T.Mesh(new T.BoxGeometry(0.75, 0.75, 0.75), backhoe_mat);
    hitch.translateZ(-1);
    hitch.translateX(-1.25);
    hitch.translateY(1);
    backhoe.add(hitch);

    let left_arm_group = new T.Group();
    left_arm_group.position.set(-1.25, 0.25, -0.4);
    backhoe.add(left_arm_group);
    let arm_left = new T.Mesh(new T.BoxGeometry(0.25, 0.25, 2), arm_mat);
    left_arm_group.add(arm_left);
    arm_left.translateY(0.5);

    let right_arm_group = new T.Group();
    right_arm_group.position.set(-1.25, 0.25, -1.6);
    backhoe.add(right_arm_group);
    let arm_right = new T.Mesh(new T.BoxGeometry(0.25, 0.25, 2), arm_mat);
    right_arm_group.add(arm_right);
    arm_right.translateY(0.5);

    let front_arm_group = new T.Group();
    backhoe.add(front_arm_group);

    let front_arm_left = new T.Mesh(new T.BoxGeometry(2, 0.5, 0.25), arm_mat);
    front_arm_left.position.x = 2.25;
    front_arm_left.position.y = 1;
    front_arm_left.position.z = -2;
    front_arm_left.rotateZ(degreesToRadians(45));
    front_arm_group.add(front_arm_left);
    front_arm_left.translateY(0.5);

    let front_arm_right = new T.Mesh(new T.BoxGeometry(2, 0.5, 0.25), arm_mat);
    front_arm_right.position.x = 2.25;
    front_arm_right.position.y = 1;
    front_arm_right.rotateZ(degreesToRadians(45));
    front_arm_group.add(front_arm_right);
    front_arm_right.translateY(0.5);

    let front_bucket_group = new T.Group();
    front_arm_group.add(front_bucket_group);
    front_bucket_group.position.set(-1.4, 0, 0);
    let front_bucket_curve = new T.Shape();
    front_bucket_curve.moveTo(-0.25, -0.9);
    front_bucket_curve.lineTo(-0.5, -0.5);
    front_bucket_curve.lineTo(-0.45, -0.3);
    front_bucket_curve.lineTo(-0.3, -0.2);
    front_bucket_curve.lineTo(-0.15, 0);
    front_bucket_curve.lineTo(0.1, 0);
    front_bucket_curve.lineTo(0.05, -0.2);
    front_bucket_curve.lineTo(0.5, -0.7);
    front_bucket_curve.lineTo(-0.25, -0.9);
    let front_bucket_geom = new T.ExtrudeGeometry(
      front_bucket_curve,
      exSettings2
    );
    let front_bucket = new T.Mesh(front_bucket_geom, arm_mat);
    front_bucket_group.add(front_bucket);
    front_bucket.translateZ(-2);
    front_bucket.translateY(2.25);
    front_bucket.translateX(4);

    super("Backhoe", backhoe, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["arm rotate", 0, 50, 45],
      ["forearm rotate", 0, 90, 45],
      ["bucket rotate", -90, 45, 0],
      ["left stabilizer rotate", 0, 45, 0],
      ["right stabilizer rotate", 0, 45, 0],
      ["front bucket rotate", -90, 0, 0],
      ["front arm rotate", -45, 18, 0],
    ]);

    this.whole_ob = backhoe;
    this.cab = cab_group;
    this.arm = arm_group;
    this.forearm = forearm_group;
    this.bucket = bucket_group;
    this.leftStab = left_arm_group;
    this.rightStab = right_arm_group;
    this.frontBucket = front_bucket;
    this.frontArm = front_arm_group;

    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    backhoe.scale.set(scale, scale, scale);
  }

  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.arm.rotation.z = degreesToRadians(-paramValues[3]);
    this.forearm.rotation.z = degreesToRadians(paramValues[4]) + Math.PI / 16;
    this.bucket.rotation.z = degreesToRadians(paramValues[5]);
    this.leftStab.rotation.x = degreesToRadians(paramValues[6]);
    this.rightStab.rotation.x = degreesToRadians(-paramValues[7]);
    this.frontBucket.rotation.z = degreesToRadians(-paramValues[8]);
    this.frontArm.rotation.z = degreesToRadians(-paramValues[9]);
  }
}

/**
 * import a building that is under construction for vehicles to "work" on
 */
export class ConstructionBuilding extends Loaders.FbxGrObject {
  constructor(x, y, z) {
    super({
      fbx: "./images/constructionBuilding.fbx",
      name: "ConstructionBuilding",
      x: x,
      y: y,
      z: z,
    });
  }
}
