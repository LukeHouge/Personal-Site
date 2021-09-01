// This sets up the town loading different objects.
//
// It should be called from the onload function, after the world has been created

// Import THREE.js library
import * as T from "./libs/CS559-Three/build/three.module.js";

// Import other functions from the framework
import { shaderMaterial } from "./libs/CS559-Framework/shaderHelper.js";
import * as SimpleObjects from "./libs/CS559-Framework/SimpleObjects.js";

// Example object imports
import { CircularTrack, TrackCar } from "./examples/track.js";

// Imports from previous workbooks
import { GrColoredRoundabout, GrAdvancedSwing, GrCarousel, GrTopSpin } from "./parkObjects.js";
import { House1, House2, Theater, Tree } from "./buildings.js";
import {
  GrCrane,
  GrExcavator,
  GrTruckCrane,
  GrBackhoe,
  ConstructionBuilding,
} from "./constructionObjects.js";
import { Car, Car2 } from "./cars.js";

// Imports unique to this workbook
import { Board, F1Car, F1Car2, Track, Copter, GrandStand } from "./track.js";

/**
 * Add objects to the world
 */
export function main(world) {
  ////////////////////////////////////
  //         Scene Setup            //
  ////////////////////////////////////
  // make a skybox and set environment map
  let ct = new T.CubeTextureLoader().load([
    "./images/scene/Right.png",
    "./images/scene/Left.png",
    "./images/scene/Top.png",
    "./images/scene/Bottom.png",
    "./images/scene/Back.png",
    "./images/scene/Front.png",
  ]);
  world.scene.background = ct;

  // Use an image for the groundplane
  const loader = new T.TextureLoader();
  const texture = loader.load("./images/ground.png");
  world.groundplane.objects[0].material = new T.MeshBasicMaterial({ map: texture });

  ////////////////////////////////////
  // EXAMPLE OBJECT: track with car //
  ////////////////////////////////////
  let track = new CircularTrack({ x: 30, z: 0 });
  let tc3 = new TrackCar(track);

  // place things on the track
  tc3.u = 0.125;
  // and make sure they are in the world
  world.add(tc3);
  world.add(track);

  ////////////////////////////////////
  //         Park Objects           //
  ////////////////////////////////////
  world.add(new GrColoredRoundabout({ x: 45, y: 0, z: -65 }));
  world.add(new GrAdvancedSwing({ x: 30, y: 0, z: -65 }));
  world.add(new GrCarousel({ x: 35, y: 0, z: -65 }));
  world.add(new GrTopSpin({ x: 40, y: 0, z: -65 }));

  ////////////////////////////////////
  //     Neighborhood of houses     //
  ////////////////////////////////////
  // small houses
  world.add(new House1(-28, 0, -85, Math.PI / 2, "House #1"));
  world.add(new House1(-28, 0, -69.5, Math.PI / 2, "House #2"));
  world.add(new House1(-5, 0, -87, -Math.PI / 2, "House #3"));
  world.add(new House1(-5, 0, -71.5, -Math.PI / 2, "House #4"));

  // large houses
  world.add(new House2(-25, 0, -60.5, Math.PI / 2, "Large House #1"));
  world.add(new House2(-25, 0, -76, Math.PI / 2, "Large House #2"));
  world.add(new House2(-25, 0, -91, Math.PI / 2, "Large House #3"));
  world.add(new House2(-7, 0, -66.5, -Math.PI / 2, "Large House #4"));
  world.add(new House2(-7, 0, -82, -Math.PI / 2, "Large House #5"));
  world.add(new House2(-7, 0, -97, -Math.PI / 2, "Large House #6"));

  // cars
  world.add(new Car2(-24, 0.2, -63.5, "CyberTruck #1", 0.4));
  world.add(new Car2(-10, 0.2, -86, "CyberTruck #2", 0.4));

  ////////////////////////////////////
  //        Construction Site        //
  ////////////////////////////////////
  // construction vehicles
  world.add(new GrCrane({ x: 50, y: 0, z: -85, size: 4 }));
  world.add(new GrExcavator({ x: 85, y: 0, z: -65, size: 1.5 }));
  world.add(new GrTruckCrane({ x: 85, y: 0, z: -85, size: 1.5 }));
  world.add(new GrBackhoe({ x: 55, y: 0, z: -75, size: 1.5 }));

  // import a building that is under construction for vehicles to "work" on
  let construction = new ConstructionBuilding(80, 0, -80);
  construction.setScale(5);
  world.add(construction);

  ////////////////////////////////////
  //          Other Scenery         //
  ////////////////////////////////////
  // theater
  let theater = new Theater(-25, 0, -20);
  theater.setScale(10);
  world.add(theater);

  // trees
  let treeCount = 1;
  for (let i = 0; i > -40; i -= 5) {
    world.add(new Tree(-45, 0, -61 + i, `Tree #${treeCount}`));
    treeCount++;
  }
  for (let i = 0; i > -40; i -= 5) {
    world.add(new Tree(15, 0, -61 + i, `Tree #${treeCount}`));
    treeCount++;
  }

  // cars for theater parking lot
  let carCount = 3;
  for (let i = 0; i < 40; i += 4) {
    if (carCount % 2 == 0) {
      world.add(new Car2(-25, 0.2, 5 + i, `CyberTruck #${carCount}`, 0.4));
    } else {
      world.add(new Car2(-38, 0.2, 4 + i, `CyberTruck #${carCount}`, 0.4));
    }
    carCount++;
  }

  ////////////////////////////////////
  //       The Main F1 Track        //
  ////////////////////////////////////
  // the track itself
  let f1Track = new Track(0, 0, 0);
  world.add(f1Track);

  // add 2 cars
  let car1 = new F1Car();
  let car2 = new F1Car2();
  world.add(car1);
  world.add(car2);

  // add a copter drone to "film" around the track
  let copter = new Copter(0, 0, 0);
  copter.setScale(5);
  world.add(copter);

  // add a leader board / jumbotron
  let board = new Board(10, 27, -20, Math.PI / 4, world);
  board.setScale(8);
  world.add(board);

  // add semis in the parking lot
  let count = 1;
  for (let i = 0; i < 40; i += 12) {
    for (let j = 0; j < 30; j += 20) {
      let semi = new Car(60 + j, 0.5, -36 + i, Math.PI / 2, `Semi #${count}`);
      world.add(semi);
      count++;
    }
  }

  world.add(new GrandStand(-3, 0, 0, Math.PI / 2, "Grandstand #1"));
  world.add(new GrandStand(-3, 0, 40, Math.PI / 2, "Grandstand #2"));
  world.add(new GrandStand(10, 0, 80, Math.PI / 1.25, "Grandstand #3"));
  world.add(new GrandStand(60, 0, 90, Math.PI, "Grandstand #4"));
}
