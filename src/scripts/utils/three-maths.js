import * as THREE from 'three';

const DEGREE_TO_RADIAN = Math.PI / 180;

const coordinatesToPosition = (lat, long, radius) => {
    const phi = (90 - lat) * DEGREE_TO_RADIAN;
    const theta = (long + 180) * DEGREE_TO_RADIAN;

    return new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    ).normalize().multiplyScalar(radius);
};

const setArc3D = (pointCenter, pointStart, pointEnd, nbOfVertices, clockWise, color) => {
    const v1 = new THREE.Vector3();
    const v2 = new THREE.Vector3();
    const normal = new THREE.Vector3();
    v1.subVectors(pointCenter, pointEnd);
    v2.subVectors(pointStart, pointEnd);
    v1.cross(v2);
    normal.copy(v1).normalize();

    let angle = pointStart.angleTo(pointEnd);
    if (clockWise) angle -= Math.PI * 2;
    const angleDelta = angle / (nbOfVertices - 1);

    const points = [];
    for (let i = 0; i < nbOfVertices; i++) {
        points.push(pointStart.clone().applyAxisAngle(normal, angleDelta * i));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const arc3D = new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: color
    }));

    return arc3D;
};

const setCurve3D = (pointStart, pointEnd, color) => {
    console.log(pointStart);
    console.log(pointEnd);
    const pointMid = pointStart.clone().add(pointEnd).divideScalar(2);
    console.log(pointMid);
    const curve = new THREE.CubicBezierCurve3(
        pointStart,
        pointMid,
        pointEnd
    );
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const curveObject = new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: color
    }));

    return curveObject;
};

const createPathOnSphere = (points, sphereRadius, offset, color) => {
    const vectors = points.map(point => coordinatesToPosition(point[0], point[1], sphereRadius + offset));
    const curve = new THREE.CatmullRomCurve3(vectors);
    const nbOfPoints = curve.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(nbOfPoints);
    const material = new THREE.LineBasicMaterial({ color: color, linewidth: 10 });
    return new THREE.Line(geometry, material);
};

export { DEGREE_TO_RADIAN, createPathOnSphere, coordinatesToPosition, setArc3D, setCurve3D };