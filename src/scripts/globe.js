import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createPathOnSphere } from './3d-utils';
import texture from './../assets/medias/earth.jpg';

const GLOBE_RADIUS = 20;
const CURVE_SEGMENTS = 32;

// ----------------
// MESHES CREATION
// ----------------

// meshe of the globe
const globe = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS, 32, 32),
    new THREE.MeshPhongMaterial({
        color: 'darkgreen',
        opacity: 0.5,
        transparent: true
    })
);

// Vehicle Path #01
const paths = [
    createPathOnSphere([
        [0, 0],
        [10, 10],
        [0, 15],
        [-10, 20],
        [-20, 25],
        [-28, 34]
    ], GLOBE_RADIUS, 0.1, 0xff0000),
    createPathOnSphere([
        [-75, 20],
        [-63, 7],
        [-51, -10],
        [-68, -14],
    ], GLOBE_RADIUS, 0.1, 0xff0000),
    // createPathOnSphere([
    //     [0, 0],
    //     [10, 10],
    //     [0, 15],
    //     [-10, 20],
    //     [-20, 25],
    //     [-28, 34]
    // ], GLOBE_RADIUS, 0.1, 0xff0000)
];


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
scene.background = new THREE.Color(0xffffff);
scene.add(globe);
paths.forEach(path => scene.add(path));


// ---------------------------
// CAMERA AND ORBIT SETTINGS
// ---------------------------
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 100);
controls.update();
(function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
})();