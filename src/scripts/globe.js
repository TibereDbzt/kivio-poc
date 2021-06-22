import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { coordinatesToPosition, createPathOnSphere } from './3d-utils';
import Zigzags from './zigzags';
import texture from './../assets/medias/earth.jpg';

const GLOBE_RADIUS = 20;
const CURVE_SEGMENTS = 32;

// ----------------
// MESHES CREATION
// ----------------

// meshe of the globe
const globe = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS, 50, 50),
    new THREE.MeshPhongMaterial({
        color: 'darkgreen',
        opacity: 0.2,
        transparent: false
    })
);

// Vehicle Path #01
const paths = [
    new Zigzags(
        coordinatesToPosition(-30, -20, GLOBE_RADIUS + 0.1),
        coordinatesToPosition(50, 45, GLOBE_RADIUS + 0.1),
    ),
    new Zigzags(
        coordinatesToPosition(-90, -90, GLOBE_RADIUS + 0.1),
        coordinatesToPosition(180, 90, GLOBE_RADIUS + 0.1),
    )
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
paths.forEach(path => scene.add(path.object));


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