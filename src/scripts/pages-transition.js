import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

export default class PagesTransition {

    constructor(overlay) {
        this.pagesLinks = document.querySelectorAll('a')
        this.overlaySVG = document.querySelector('.transparent-logo');
        this.shapes = {
            circleTopLeft: overlay.querySelector('.circleTopLeft'),
            triangleTopRight: overlay.querySelector('.triangleTopRight'),
            circleBottomLeft: overlay.querySelector('.circleBottomLeft'),
            triangleBottomRight: overlay.querySelector('.triangleBottomRight')
        }
        this.timeline = gsap.timeline({ repeat: 0 });
        this.initEvents();
    }

    initEvents() {
        document.addEventListener('click', e => {
            if (e.target.closest('a') !== null && e.target.closest('a').classList.contains('internLink')) {
                this.animateTransitionPage();
            }
        });
    }

    animateTransitionPage() {
        // this.timeline.to(this.shapes.circleTopLeft, { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out' });
        // this.timeline.to(this.shapes.triangleTopRight, { scale: 30, opacity: 1, duration: 1, ease: 'power2.inout' });
        this.timeline.to(this.overlaySVG, { scale: 0.8, translateX: 0, translateY: 0, duration: 0.5, ease: CustomEase.create("custom", "M0,0 C0,0 0.005,0.125 0.02,0.199 0.033,0.268 0.056,0.391 0.075,0.46 0.096,0.538 0.112,0.602 0.136,0.672 0.16,0.742 0.208,0.804 0.24,0.834 0.296,0.886 0.308,0.896 0.358,0.922 0.413,0.95 0.502,0.972 0.576,0.98 0.674,0.99 0.684,0.99 0.82,1 0.887,1.004 1,1 1,1 ") });
    }

}