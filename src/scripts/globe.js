import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DEGREE_TO_RADIAN, coordinatesToPosition, setArc3D } from './3d-utils';
import texture from './../assets/medias/earth.jpg';

const GLOBE_RADIUS = 20;
const CURVE_SEGMENTS = 32;

// CREATING MESHES
const globe = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS - 0.1, 32, 32),
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
const pointStart = coordinatesToPosition(0, -20, GLOBE_RADIUS);
const pointEnd = coordinatesToPosition(30, 20, GLOBE_RADIUS);
// const pointStart = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize().multiplyScalar(GLOBE_RADIUS);
// const pointEnd = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize().multiplyScalar(GLOBE_RADIUS);
const arc3D = setArc3D(pointCenter, pointStart, pointEnd, 50, false, "lime");


// const vStart = coordinatesToPosition(30, 30, GLOBE_RADIUS);
// const vMid1 = coordinatesToPosition(45, 0, GLOBE_RADIUS);
// const vMid2 = coordinatesToPosition(65, -30, GLOBE_RADIUS);
// const vEnd = coordinatesToPosition(170, -70, GLOBE_RADIUS);
// const spline = new THREE.CubicBezierCurve3(vStart, vMid1, vMid2, vEnd);

// const points = new Float32Array(CURVE_SEGMENTS * 3); // ???????????????????
// const vertices = spline.getPoints(CURVE_SEGMENTS - 1);
// const curveGeometry = new THREE.BufferGeometry(vertices);

// for (let i = 0, j = 0; i < vertices.length; i++) {
//     const vertex = vertices[i];
//     points[j++] = vertex.x;
//     points[j++] = vertex.y;
//     points[j++] = 0;
//     console.log(vertex);
// }
// console.log(curveGeometry);
// curveGeometry.setAttribute('position', new THREE.BufferAttribute(points, 3));
// curveGeometry.setDrawRange(0, CURVE_SEGMENTS);
// const material = new THREE.LineBasicMaterial({ color: 0xfff000 });
// const curveFinal = new THREE.Line(curveGeometry, material);
// const edges = new THREE.EdgesGeometry(curveGeometry);
// const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));


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
scene.add(globe);
// scene.add(splineObject);
// scene.add(curveFinal);
scene.add(arc3D);

(function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
})();