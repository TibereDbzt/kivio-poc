import * as THREE from 'three';

export default class Zigzags {

    constructor(v1, v2) {

        const n = 5 //precision des zigzags (complexité en 2^n)
        const w = 0.3 //largeur des zigzags
        this.radius = v1.length()

        const aux = (a, b, k) => {
            if (k = 0) {
                return []
            }
            m = (a + b) / 2
            o = b - a
            o.set(-o.y, o.x)
            p = m + 2 * w * (Math.random() - 0.5) * o
            t = aux(a, p, k - 1)
            t.push(p)
            return t.concat(aux(p, b, k - 1))
        }

        const e1 = v2.sub(v1);
        const e2 = new THREE.Vector3();
        e2.crossVectors(a, b);
        e2.normalize()
        e2.multiplyScalar(e1.length())

        const f = v => {
            p = v.x * e1 + v.y * e2 + v1
            p.normalize()
            p.multiplyScalar(this.radius())
            return p
        }

        l = aux(THREE.vector2(0, 0), THREE.vector2(1, 0), n).map(f)

        this.precourbe = new THREE.CatmullRomCurve3(l) // ptetre changer curveType et tension pour voir
    }


    getPoint(t, optionalTarget = new Vector3()) {
        this.precourbe.getPoint(t, optionalTarget)
        optionalTarget.normalize()
        optionalTarget.multiplyScalar(this.radius)
        return optionalTarget
    }
}