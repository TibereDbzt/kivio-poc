import gsap from 'gsap';
import './../../styles/modules/pages-transition.sass';

class CanvasShapesTransition {

    constructor(canvas) {
        this.canvas = canvas;
    }

}

class LogoOverlayTransition {

    constructor(overlay) {
        this.overlay = overlay;
        this.svg = this.overlay.querySelector('[data-transition-svg]');
        this.shape = this.svg.querySelector('[data-transition-shape]');
        this.pagesLinks = document.querySelectorAll('a');
        this.timeline = gsap.timeline({ repeat: 0 });
        this.initEvents();
    }

    initEvents() {
        document.addEventListener('click', e => {
            if (e.target.closest('a') !== null && e.target.closest('a').classList.contains('internLink')) {
                console.log('ok');
                this.animateTransitionPage();
            }
        });
    }

    animateTransitionPage() {
        // this.timeline.to(this.shapes.circleTopLeft, { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out' });
        // this.timeline.to(this.shapes.triangleTopRight, { scale: 30, opacity: 1, duration: 1, ease: 'power2.inout' });
        // this.timeline.to(this.overlay, { scale: 0.8, translateX: 0, translateY: 0, duration: 0.5, ease: 'power4.out' });
        this.timeline.to(this.svg, { scale: 0.92, translateX: 0, translateY: 0, duration: 0.5, ease: 'power4.out' });
        this.timeline.to(this.svg, { rotation: 360 * 5, duration: 0.9, ease: 'elastic.inOut' });
        this.timeline.to(this.svg, { scale: 20, translateX: 970, translateY: 722, duration: 0.5, ease: 'power4.out' });
        this.timeline.to(this.svg, { clearProps: 'scale', duration: 1, ease: 'power4.inOut' });
    }

}

export { CanvasShapesTransition, LogoOverlayTransition };