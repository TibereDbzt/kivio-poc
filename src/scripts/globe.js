import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DEGREE_TO_RADIAN, coordinatesToPosition, setArc3D, setCurve3D } from './3d-utils';
import texture from './../assets/medias/earth.jpg';

const GLOBE_RADIUS = 20;
const CURVE_SEGMENTS = 32;

// CREATING MESHES
const globe = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS - 19.5, 32, 32),
    new THREE.MeshBasicMaterial({
        // color: 0xff0000
        map: new THREE.TextureLoader().load(texture)
    })
);

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

const pointCenter = new THREE.Vector3();
const pointStart = coordinatesToPosition(0, 0, GLOBE_RADIUS + 1);
const pointEnd = coordinatesToPosition(30, 180, GLOBE_RADIUS + 1);
// const pointStart = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize().multiplyScalar(GLOBE_RADIUS);
// const pointEnd = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize().multiplyScalar(GLOBE_RADIUS);
// const arc3D = setArc3D(pointCenter, pointStart, pointEnd, 4, false, "lime");
const curve3D = setCurve3D(pointStart, pointEnd, "lime");

const dotStart = new THREE.Points(new THREE.BufferGeometry().setFromPoints(pointStart), new THREE.PointsMaterial({ size: 50, sizeAttenuation: false }));
console.log(dotStart);

// SET THE RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// SET THE CAMERA AND ORBIT CONTROLS
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 100);
controls.update();

// SET THE SCENE AND ADD MESHS TO IT
const scene = new THREE.Scene();
// scene.add(globe);
// scene.add(splineObject);
// scene.add(curveFinal);
scene.add(dotStart);
scene.add(curve3D);

(function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
})();