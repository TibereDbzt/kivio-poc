 /* eslint-disable */
 import * as THREE from 'three';
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
 import { coordinatesToPosition, flatCoordsToSphereCoords } from '../utils/three-maths';
 import SphericalPathCurve from './SphericalPathCurve';
 import texture from './../../assets/medias/earth_realistic.jpg';
 import { Group } from 'three';
 import points from './../utils/points.json';

 const GLOBE_RADIUS = 4;
 const GLOBE_WIDTH = 4098 / 2;
 const GLOBE_HEIGHT = 1968 / 2;
 const CURVE_SEGMENTS = 32;

 // ----------------
 // MESHES CREATION
 // ----------------

 // Create world map of points
 const createWorldMap = () => {
     //  window.fetch('./../utils/points.json')
     //      .then(response => response.json())
     //      .then(data => {
     //          init(data.points);
     //      });

     // const init = (points) => {
     console.log(points.points.length);
     // };
     const nbOfPoints = points.points.length;
     const mergedGeometry = new THREE.BufferGeometry();
     const pointGeometry = new THREE.SphereGeometry(0.5, 1, 1);
     const pointMaterial = new THREE.MeshBasicMaterial({
         color: '#000'
     });
     const pointMesh = new THREE.InstancedMesh(pointGeometry, pointMaterial, nbOfPoints);
     points.points.forEach(point => {
         const { x, y, z } = flatCoordsToSphereCoords(point.x, point.y, GLOBE_RADIUS, GLOBE_WIDTH, GLOBE_HEIGHT);
         pointGeometry.translate(x, y, z);
         mergedGeometry.merge(pointGeometry);
         pointGeometry.translate(-x, -y, -z);
     });

     return new THREE.Mesh(mergedGeometry, pointMaterial);

 };
 createWorldMap();


 // meshe of the globe
 const globe = new THREE.Mesh(
     new THREE.SphereGeometry(GLOBE_RADIUS, 50, 50),
     // new THREE.MeshPhongMaterial({
     //     color: 0x3336B0
     // })
     new THREE.MeshBasicMaterial({
         map: new THREE.TextureLoader().load(texture)
             // color: 0x3336B0,
             // opacity: 0.2,

         // transparent: true
     })
 );
 globe.name = 'globe';

 // Vehicle Path #01
 const paths = [
     new SphericalPathCurve(
         coordinatesToPosition(-30, -20, GLOBE_RADIUS + 0.1),
         coordinatesToPosition(50, 45, GLOBE_RADIUS + 0.1),
     ),
     new SphericalPathCurve(
         coordinatesToPosition(-90, -90, GLOBE_RADIUS + 0.1),
         coordinatesToPosition(180, 90, GLOBE_RADIUS + 0.1),
     )
 ];
 paths[0].name = 'path 01';
 paths[1].name = 'path 02';


 const geometry = new THREE.BoxGeometry(1, 1, 1);
 const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

 const cubeA = new THREE.Mesh(geometry, material);
 cubeA.position.set(100, 100, 0);

 const cubeB = new THREE.Mesh(geometry, material);
 cubeB.position.set(-100, -100, 0);

 const elementsGroup = new THREE.Group();
 elementsGroup.add(cubeA);
 elementsGroup.add(cubeB);
 elementsGroup.add(globe);
 elementsGroup.add(paths[0].object);
 console.log(elementsGroup);
 // paths.forEach(path => elementsGroup.add(path.object));

 // ----------------
 // LIGHT CREATION
 // ----------------
 const purpleLight = new THREE.PointLight(0x6266F4, 1, 400, 5);
 purpleLight.position.set(-10, 10, 3);

 const orangeLight = new THREE.PointLight(0xFFA67A, 1, 30, 6);
 orangeLight.position.set(4, 6, 3);


 // ----------------
 // RENDER SETTINGS
 // ----------------
 console.log(window.innerWidth + ' ' + window.innerHeight);
 const renderer = new THREE.WebGLRenderer({ antialias: true });
 renderer.setSize(window.innerWidth, window.innerHeight);
 renderer.setPixelRatio(window.devicePixelRatio);
 document.body.appendChild(renderer.domElement);


 // ----------------
 // SCENE CREATTION
 // ----------------
 const scene = new THREE.Scene()
 scene.background = new THREE.Color(0x0E0F2B);
 // scene.add(globe);
 scene.add(elementsGroup);
 paths.forEach(path => scene.add(path.object));
 scene.add(purpleLight);
 scene.add(orangeLight);
 scene.add(createWorldMap());


 // ---------------------------
 // CAMERA AND ORBIT SETTINGS
 // ---------------------------
 const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 const controls = new OrbitControls(camera, renderer.domElement);
 camera.position.set(0, 6, 5);
 controls.update();
 (function animate() {
     renderer.render(scene, camera);
     requestAnimationFrame(animate);
 })();


 // ----------------
 // EVENTS HANDLER
 // ----------------
 const canvas = document.querySelector('canvas');
 const size = { width: canvas.getBoundingClientRect().width, height: canvas.getBoundingClientRect().height };
 let lastMousePos = { x: 0, y: 0 };
 let direction;

 const onMouseMove = (e) => {
     const goesLeft = e.clientX < lastMousePos.x;
     goesLeft ? direction = 1 : direction = -1;
     // console.log(goesLeft);
     lastMousePos.x = e.clientX;
     // const goesLeft = (size.width / 2) - e.clientX;
     // console.log(elementsGroup.rotation);

     const quaternion = new THREE.Quaternion();
     quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * direction / 2000);
     elementsGroup.applyQuaternion(quaternion);
     paths.forEach(path => {
         path.geometry.applyQuaternion(quaternion);
     });
 };

 const onMouseUp = (e) => {

 };

 canvas.addEventListener('mousemove', (e) => onMouseMove(e));


 // ---------------------------
 // CAMERA AND ORBIT SETTINGS
 // ---------------------------
 // setInterval(() => {

 // }, 100);