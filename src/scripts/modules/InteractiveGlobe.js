import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { coordinatesToPosition, createPathOnSphere } from '../utils/three-maths';
import SphericalPathCurve from './SphericalPathCurve';
import texture from './../../assets/medias/earth_realistic.jpg';
import { Group } from 'three';

const GLOBE_RADIUS = 4;
const CURVE_SEGMENTS = 32;

// ----------------
// MESHES CREATION
// ----------------

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


// ---------------------------
// CAMERA AND ORBIT SETTINGS
// ---------------------------
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 3);
controls.update();
(function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
})();


// ----------------
// EVENTS HANDLER
// ----------------
const canvas = document.querySelector('canvas');

const onMouseDown = () => {
    // console.log(elementsGroup.rotation);
    elementsGroup.rotation.z += 0.02;
}

canvas.addEventListener('mousemove', () => onMouseDown());


// ---------------------------
// CAMERA AND ORBIT SETTINGS
// ---------------------------
// setInterval(() => {

// }, 100);