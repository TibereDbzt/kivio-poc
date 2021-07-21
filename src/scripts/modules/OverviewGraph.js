import gsap from 'gsap';
import { EASES } from '../utils/animations';
import './../../styles/modules/overview.sass';
import { SvgElement } from './SvgElement';

export default class OverviewGraph {

    constructor(el) {
        this.DOM = {
            svg: el,
            objects: el.querySelectorAll('[data-overview-object]'),
            filledRoutes: this.setFilledRoutes(el.querySelectorAll('[data-overview-filled-route]')),
            dottedRoutes: el.querySelectorAll('[data-overview-dotted-route]'),
            kivio: el.querySelector('[data-overview-kivio]'),
            finalRoute: new SvgElement(el.querySelector('[data-overview-final-route]')),
            widgets: this.setWidgets(el.querySelectorAll('[data-overview-widget]')),
        };
        this.setObjects();
        this.setDottedRoutes();
        this.timeline = gsap.timeline().delay(3);
        this.animate();
    }

    animate() {
        Array.from(this.DOM.objects).reverse().forEach((object, i) => {
            this.timeline.to(object, {
                opacity: 1,
                repeat: 2,
                duration: 0.1
            });
            this.timeline.add(this.DOM.filledRoutes[this.DOM.filledRoutes.length - 1 - i].drawShapes(1.3, EASES.markedIn, 0.4), '<-=0.6');
            this.timeline.add(this.DOM.finalRoute.drawShapes(0.5, EASES.markedOut, 0, '>'));
            this.timeline.add('drawingWidget', '>-=0.9');
            if (this.DOM.objects.length - 1 !== i) {
                this.timeline.add(this.DOM.finalRoute.undrawShapes(1.6, EASES.markedOut, 0), '>');
                this.timeline.add(this.DOM.finalRoute.setShapesAttributes(), '>');
            }
            this.timeline.fromTo(this.DOM.widgets[i].DOM.svg, {
                translateX: -50,
                opacity: 0
            }, {
                translateX: 0,
                opacity: 1,
                duration: 0.5,
                ease: EASES.markedOut
            }, 'drawingWidget');
            this.timeline.add(this.DOM.widgets[i].drawShapes(1, EASES.markedOut, 0), 'drawingWidget');
        })
    }

    setObjects() {
        this.DOM.objects.forEach(object => {
            gsap.set(object, {
                opacity: 0.2,
            });
        });
    }

    setFilledRoutes(routes) {
        const armedRoutes = [];
        routes.forEach(route => {
            armedRoutes.push(new SvgElement(route));
        });
        return armedRoutes;
    }

    setDottedRoutes() {
        this.DOM.dottedRoutes.forEach(route => {
            gsap.set(route, {
                opacity: 0.5,
            });
        });
    }

    setWidgets(widgets) {
        const armedWidgets = [];
        widgets.forEach(widget => {
            const svgElem = new SvgElement(widget);
            gsap.set(svgElem.DOM.svg, {
                opacity: 0
            });
            armedWidgets.push(svgElem);
        });
        return armedWidgets;
    }

}