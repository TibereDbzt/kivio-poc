import gsap from 'gsap';

export class SvgElement {

    constructor(svgElement) {
        this.DOM = {
            svg: svgElement,
            shapes: this.getShapes(svgElement)
        };
        this.setShapesAttributes();
    }

    drawShapes(duration, ease, offset, tracking = '') {
        const timeline = gsap.timeline();
        const shapes = this.DOM.shapes;
        shapes.forEach((shape, i) => {
            timeline.add(gsap.to(shape.el, { strokeDashoffset: 0, duration: duration, ease: ease, delay: i * offset }), tracking);
            if (shape.el.dataset.staticFill !== '' && shape.el.hasAttribute('fill')) {
                timeline.add(gsap.to(shape.el, { fill: shape.fill, ease: ease, delay: 1 }), tracking);
            }
        });
        return timeline;
    }

    undrawShapes(duration, ease, offset, tracking) {
        const shapes = this.DOM.shapes;
        const timeline = gsap.timeline();
        shapes.forEach((shape, i) => timeline.add(gsap.to(shape.el, { strokeDashoffset: -shape.length, duration: duration, ease: ease, delay: i * offset }), tracking));
        return timeline;
    }

    setShapesAttributes() {
        const shapes = this.DOM.shapes;
        const timeline = gsap.timeline();
        shapes.forEach(shape => {
            if (shape.el.dataset.staticFill !== '' && shape.el.hasAttribute('fill')) {
                shape.fill = shape.el.getAttribute('fill');
                timeline.set(shape.el, {
                    fill: 'none'
                });
            }
            timeline.set(shape.el, {
                strokeDasharray: shape.length + ' ' + shape.length,
                strokeDashoffset: shape.length
            });
        });
        return timeline;
    }

    getShapeLength(element) {
        if (!(element instanceof SVGGeometryElement)) return null;
        if (element instanceof SVGPolygonElement) return element.getTotalLength();
        if (element instanceof SVGPolylineElement) return element.getTotalLength();
        if (element instanceof SVGCircleElement) return Math.round(2 * Math.PI * parseInt(element.getAttribute('r'), 10));
        if (element instanceof SVGPathElement) return element.getTotalLength();
        if (element instanceof SVGRectElement) return Math.round(2 * parseInt(element.getAttribute('width')) + 2 * parseInt(element.getAttribute('height')));
        if (element instanceof SVGEllipseElement) {
            const rx = parseInt(element.getAttribute('rx'));
            const ry = parseInt(element.getAttribute('ry'));
            let h = Math.pow((rx - ry), 2) / Math.pow((rx + ry), 2);
            return (Math.PI * (rx + ry)) * (1 + ((3 * h) / (10 + Math.sqrt(4 - (3 * h)))));
        }
        if (element instanceof SVGLineElement) {
            const x1 = parseInt(element.getAttribute('x1'));
            const x2 = parseInt(element.getAttribute('x2'));
            const y1 = parseInt(element.getAttribute('y1'));
            const y2 = parseInt(element.getAttribute('y2'));
            return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        }
    }

    getShapes(svgElement) {
        const svg = svgElement;
        const shapes = [];
        const trackShapes = element => {
            if (element.children.length > 0)[...element.children].forEach(subChildElement => trackShapes(subChildElement));
            if (!element.hasAttribute('stroke')) return;
            const shapeLength = this.getShapeLength(element);
            if (shapeLength) shapes.push({
                el: element,
                length: shapeLength
            });
        };
        trackShapes(svg);
        return shapes;
    }

}