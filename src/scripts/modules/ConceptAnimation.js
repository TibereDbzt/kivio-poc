import { EASES } from '../utils/animations';
import './../../styles/modules/concept.sass';
import gsap from 'gsap';
import { SvgElement } from './SvgElement';

export default class ConceptAnimation {

    constructor(el) {
        this.DOM = {
            el: el,
            objects: el.querySelectorAll('[data-concept-object]'),
            route1: new SvgElement(el.querySelector('[data-concept-route1]')),
            kivio: el.querySelectorAll('[data-concept-kivio]'),
            route2: new SvgElement(el.querySelector('[data-concept-route2]')),
            factory: el.querySelectorAll('[data-concept-factory]'),
            benefits: el.querySelectorAll('[data-concept-benefit]'),
        };
        this.timeline = gsap.timeline().delay(1);
        this.timeline.add(this.animateObjects());
        this.timeline.add(this.animateRouteAndLogo(), '>-=0.4');
        this.timeline.add(this.animateFactory(), '>-=0.4');
    }

    animateObjects() {
        const timeline = gsap.timeline();
        timeline.delay(2);
        this.DOM.objects.forEach((object, i) => {
            // const randomTX = Math.ceil((Math.random() - 0.5) * 30);
            // console.log(randomTX);
            timeline.fromTo(object, { opacity: 0, scaleX: 1.5, scaleY: 1.3 }, { opacity: 1, scaleX: 1, scaleY: 1, translateX: 0, duration: 0.3, ease: EASES.markedOut });
        });
        return timeline;
    }

    animateRouteAndLogo() {
        const timeline = gsap.timeline();
        timeline.add(this.DOM.route1.drawShapes(2, EASES.markedInOut, 0));
        this.DOM.kivio.forEach(shape => {
            timeline.fromTo(shape, { opacity: 0 }, { opacity: 1, duration: 0.1 });
            timeline.fromTo(shape, { opacity: 1 }, { opacity: 0, duration: 0.1 });
            timeline.fromTo(shape, { opacity: 0 }, { opacity: 1, duration: 0.1 });
        });
        timeline.add(this.DOM.route2.drawShapes(2, EASES.markedInOut, 0), '>-=0.4');
        return timeline;
    }

    animateFactory() {
        const timeline = gsap.timeline();
        timeline.from(this.DOM.factory, { opacity: 0, scaleX: 1.5, scaleY: 1.3, duration: 0.3, ease: EASES.markedOut });
        this.DOM.benefits.forEach(benefit => {
            timeline.from(benefit, { opacity: 0, duration: 0.3 });
        });
        return timeline;
    }

}