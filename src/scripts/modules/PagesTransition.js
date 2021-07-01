import gsap from 'gsap';
import './../../styles/modules/pages-transition.sass';

class CanvasShapesTransition {

    constructor(canvas) {
        this.canvas = canvas;
    }

}

class LogoOverlayTransition {

    constructor(overlay) {
        this.pagesLinks = document.querySelectorAll('a')
        this.overlay = document.querySelector('.transparent-logo');
        this.svg = this.svg.querySelector('[data-transition-svg]');
        this.shape = this.svg.querySelector('[data-transition-shape]');
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
        this.timeline.to(this.overlay, { scale: 0.8, translateX: 0, translateY: 0, duration: 0.5, ease: 'power4.out' });
        this.timeline.to(this.shape, { scale: 0.8, translateX: 0, translateY: 0, duration: 0.5, ease: 'power4.out' });
    }

}

export { CanvasShapesTransition, LogoOverlayTransition };