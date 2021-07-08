import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import each from 'lodash/each';

gsap.registerPlugin(CustomEase);

const EASES = {
    markedInOut: CustomEase.create("custom", "M0,0 C0.408,0.034 0.346,0.12 0.426,0.536 0.508,0.966 0.686,1 1,1 "),
    markedIn: CustomEase.create("custom", "M0,0 C0.876,0 0.526,1 1,1 "),
    markedOut: CustomEase.create("custom", "M0,0 C0.11,0.494 0.072,0.602 0.184,0.778 0.282,0.932 0.504,1 1,1 ")
};

const skewYOpactityReveal = (el) => {
    const letters = el.querySelectorAll('span');
    const timeline = gsap.timeline();
    each(letters, letter => {
        timeline.add(gsap.fromTo(letter, { translateY: 200, opacity: 0, scaleY: 2 }, { translateY: 0, opacity: 1, scaleY: 1, duration: 1.4, ease: EASES.markedInOut }), '<+=0.1');
    });
    return timeline;
};

export { skewYOpactityReveal, EASES };