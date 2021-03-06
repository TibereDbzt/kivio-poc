import * as THREE from 'three';

export default class SphericalPathCurve {

    constructor(v1, v2) {

        const n = 5 //precision des zigzags (complexit√© en 2^n)
        const w = 0.3 //largeur des zigzags
        this.radius = v1.length()
            // const radius = v1.length();

        const aux = (a, b, k) => {
            if (k == 0) {
                return [];
            }
            const m = a.clone().add(b).divideScalar(2);
            const o = b.clone().sub(a);
            o.set(-o.y, o.x)
                // p = m + 2 * w * (Math.random() - 0.5) * o
            const p = m.add(o.multiplyScalar(2 * w * (Math.random() - 0.5)));
            const t = aux(a, p, k - 1);
            t.push(p);
            return t.concat(aux(p, b, k - 1));
        }

        const e1 = v2.clone().sub(v1);
        const e2 = new THREE.Vector3();
        e2.crossVectors(v1, v2);
        e2.normalize()
        e2.multiplyScalar(e1.length())

        const f = v => {
            // p = v.x * e1 + v.y * e2 + v1
            const p = e1.clone().multiplyScalar(v.x).add(e2.clone().multiplyScalar(v.y)).add(v1);
            p.normalize()
            p.multiplyScalar(this.radius);
            return p;
        }

        const l = aux(new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), n).map(f);
        l.unshift(v1);
        l.push(v2);

        this.precourbe = new THREE.CatmullRomCurve3(l); // ptetre changer curveType et tension pour voir
        this.material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        // this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.precourbe.getPoints(1000));
        this.object = new THREE.Line(this.geometry, this.material);
        // this.object = new THREE.Mesh(this.geometry, this.material);
        // this.geometry.setDrawRange(0, 1000);
        console.log(this.geometry);
        console.log(this.object);
        this.startTime = performance.now();
        this.drawAnimatedLine();
    }

    drawAnimatedLine() {
        const timeElapsed = performance.now() - this.startTime;
        const progress = timeElapsed / 15000;
        let drawRangeCount = progress * 1000;
        if (progress < 0.999) {
            this.geometry.setDrawRange(0, drawRangeCount);
            requestAnimationFrame(this.drawAnimatedLine.bind(this));
        }
    }

    getPoint(t, optionalTarget = new THREE.Vector3()) {
        console.log(this);
        this.precourbe.getPoint(t, optionalTarget);
        optionalTarget.normalize();
        optionalTarget.multiplyScalar(this.radius);
        return optionalTarget;
    }
}