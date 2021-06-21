import * as THREE from 'three';

var camera, scene, renderer, sphereGeometry, planeGeometry, sphereMaterial, planeMaterial, sphereMesh, planeMesh;

var theta = 0,
    numCollisions = 0;

init();
render();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.z = 1000;
    camera.position.x = 200;
    camera.position.y = 50;
    camera.lookAt(scene.position);
    scene.add(camera);

    var pointLight = new THREE.DirectionalLight(0xbbbbbb);
    pointLight.position.set(100, 100, 500);
    scene.add(pointLight);

    var ambientLight = new THREE.AmbientLight(0xbbbbbb);
    scene.add(ambientLight);

    sphereGeometry = new THREE.SphereGeometry(200, 64, 64);
    sphereMaterial = new THREE.MeshPhongMaterial({
        color: 'darkgreen',
        opacity: 0.5,
        transparent: true
    });

    sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphereMesh);

    planeGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    planeGeometry.dynamic = true;

    planeMaterial = new THREE.MeshPhongMaterial({
        color: 'blue'
    });

    planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.material.side = THREE.DoubleSide;
    planeMesh.position.z = 0;
    planeMesh.position.y = 0;

    let positionAttribute = planeMesh.geometry.getAttribute('position');
    console.log(positionAttribute);
    let vector = new THREE.Vector3();

    for (var vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++) {

        var localVertex = vector.fromBufferAttribute(positionAttribute, vertexIndex).clone();
        console.log(localVertex);

        localVertex.z = 201;
        var directionVector = new THREE.Vector3();
        directionVector.subVectors(sphereMesh.position, localVertex);
        directionVector.normalize();
        //var ray = new THREE.Raycaster(localVertex, new THREE.Vector3(0, 0, -1));
        var ray = new THREE.Raycaster(localVertex, directionVector);

        var collisionResults = ray.intersectObject(sphereMesh);
        numCollisions += collisionResults.length;

        if (collisionResults.length > 0) {
            localVertex.z = collisionResults[0].point.z + 5;
            planeMesh.geometry.arr
            planeMesh.geometry.vertices[vertexIndex].z = collisionResults[0].point.z + 5;
        }
    }

    $('#Text').text('Number of collisions: ' + numCollisions);

    planeMesh.geometry.verticesNeedUpdate = true;
    planeMesh.geometry.normalsNeedUpdate = true;

    scene.add(planeMesh);

    var axes = new THREE.AxisHelper(500);
    scene.add(axes);

    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

function render() {

    renderer.render(scene, camera);
    theta += 0.01;
    camera.position.x = 1000 * Math.cos(theta);
    camera.position.y = 10;
    camera.position.z = 1000 * Math.sin(theta);

    camera.lookAt(scene.position);

    requestAnimationFrame(render);
}

document.addEventListener('keydown', function(e) {
    var key = e.keyCode;

    switch (key) {
        case 37:

            theta += 0.1;
            break;

        case 39:

            theta -= 0.1;
            break;
    }
}, false);