import * as THREE from 'three';

export default class Zigzags {

    constructor(v1, v2) {

        const n = 5 //precision des zigzags (complexité en 2^n)
        const w = 0.3 //largeur des zigzags
        this.radius = v1.length()
            // const radius = v1.length();

        const aux = (a, b, k) => {
            if (k == 0) {
                return []
            }
            const m = a.clone().add(b).divideScalar(2);
            const o = b.clone().sub(a)
            o.set(-o.y, o.x)
                // p = m + 2 * w * (Math.random() - 0.5) * o
            const p = m.addScalar(2).multiplyScalar(w * Math.random() - 0.5).multiply(o);
            const t = aux(a, p, k - 1)
            t.push(p)
            return t.concat(aux(p, b, k - 1))
        }

        const e1 = v2.sub(v1);
        const e2 = new THREE.Vector3();
        e2.crossVectors(v1, v2);
        e2.normalize()
        e2.multiplyScalar(e1.length())

        const f = v => {
            // p = v.x * e1 + v.y * e2 + v1
            const p = e1.multiplyScalar(v.x).add(e2.multiplyScalar(v.y)).add(v1);
            p.normalize()
            p.multiplyScalar(this.radius);
            return p
        }

        const l = aux(new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), n).map(f)

        this.precourbe = new THREE.CatmullRomCurve3(l) // ptetre changer curveType et tension pour voir
        this.material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.precourbe.getPoints(200));
        this.object = new THREE.Line(this.geometry, this.material);
    }

    getPoint(t, optionalTarget = new Vector3()) {
        console.log(this);
        this.precourbe.getPoint(t, optionalTarget)
        optionalTarget.normalize()
        optionalTarget.multiplyScalar(this.radius)
        return optionalTarget
    }
}