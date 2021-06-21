import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DEGREE_TO_RADIAN, coordinatesToPosition, setArc3D, setCurve3D } from './3d-utils';
import texture from './../assets/medias/earth.jpg';

const GLOBE_RADIUS = 20;
const CURVE_SEGMENTS = 32;

// ----------------
// MESHES CREATION
// ----------------

// meshe of the globe
const globe = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS, 32, 32),
    new THREE.MeshBasicMaterial({
        // color: 0xff0000
        map: new THREE.TextureLoader().load(texture)
    })
);

// meshe of a simple spline curve
// const curve = new THREE.CatmullRomCurve3([
//     new THREE.Vector3(-10, 0, 10),
//     new THREE.Vector3(-5, 5, 5),
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(5, -5, 5),
//     new THREE.Vector3(10, 0, 10)
// ]);
// const points = curve.getPoints(100);
// const geometry = new THREE.BufferGeometry().setFromPoints(points);
// const material = new THREE.LineBasicMaterial({ color: 0xfff000 });
// const splineObject = new THREE.Line(geometry, material);

// meshe of a vehicle path
const pointCenter = new THREE.Vector3();
const pointStart = coordinatesToPosition(0, 0, GLOBE_RADIUS + 1);
const pointEnd = coordinatesToPosition(30, 180, GLOBE_RADIUS + 1);
const arc3D = setArc3D(pointCenter, pointStart, pointEnd, 20, false, "lime");
// doesn't work as expected
// const curve3D = setCurve3D(pointStart, pointEnd, "lime");


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
const scene = new THREE.Scene();
scene.add(globe);
// scene.add(splineObject);
scene.add(arc3D);


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