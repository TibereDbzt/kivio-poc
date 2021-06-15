import * as THREE from 'three';

const DEGREE_TO_RADIAN = Math.PI / 180;

const coordinatesToPosition = (lat, long, radius) => {
    const phi = (90 - lat) * DEGREE_TO_RADIAN;
    const theta = (long + 180) * DEGREE_TO_RADIAN;

    return new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.theta
    );
};

const setArc3D = (pointCenter, pointStart, pointEnd, nbOfVertices, clockWise, color) => {
    const v1 = new THREE.Vector3(),
        v2 = new THREE.Vector3(),
        normal = new THREE.Vector3();
    v1.subVectors(pointCenter, pointEnd);
    v2.subVectors(pointStart, pointEnd);
    v1.cross(v2);
    normal.copy(v1).normalize();

    const angle = pointStart.angleTo(pointEnd);
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
}

export { DEGREE_TO_RADIAN, coordinatesToPosition, setArc3D };