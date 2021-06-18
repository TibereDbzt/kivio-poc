import './../styles/_anim.sass';
import gsap from 'gsap';

export default class LoaderAnimation {

    constructor(container) {
        this.container = container;
        this.svg = container.querySelector('.loader__logo');
        this.shapes = {
            circleTopLeft: this.svg.querySelector('path.circleTopLeft'),
            triangleTopRight: this.svg.querySelector('path.triangleTopRight'),
            circleBottomLeft: this.svg.querySelector('path.circleBottomLeft'),
            triangleBottomRight: this.svg.querySelector('path.triangleBottomRight')
        };
        this.timeline = gsap.timeline({ repeat: -1 });
        this.isPaused = true;
        this.initEvents();
    }

    initEvents() {
        this.container.addEventListener('click', this.switchResumeAnimation.bind(this));
    }

    switchResumeAnimation() {
        this.timeline.paused(this.isPaused);
        this.isPaused = !this.isPaused;
    }

    animate() {
        this.timeline.set(this.shapes.triangleTopRight, { transformOrigin: 'top left' });
        this.timeline.to(this.shapes.triangleTopRight, { rotation: -90, translateX: -3, translateX: -6, duration: 0.4, ease: 'power4.out' });
        this.timeline.set(this.shapes.triangleBottomRight, { transformOrigin: 'top left' });
        this.timeline.to(this.shapes.triangleBottomRight, { rotation: -90, duration: 0.4, translateX: -2, ease: 'power4.out' });
        this.timeline.to(this.shapes.circleBottomLeft, { xPercent: 100, translateX: 6, translateY: 11, duration: 0.4, ease: 'power4.out' });
        this.timeline.to(this.shapes.triangleTopRight, { rotation: -180, translateX: -3, duration: 0.4, ease: 'power4.out' });
        this.timeline.to(this.shapes.circleTopLeft, { yPercent: 100, translateX: 6, translateY: 11, duration: 0.4, ease: 'power4.out' });
        this.timeline.set(this.shapes.triangleTopRight, { transformOrigin: 'top right' });
        this.timeline.to(this.shapes.triangleTopRight, { rotation: -90, duration: 0.4, ease: 'power4.out' });
        this.timeline.to(this.svg, { rotate: 90, duration: 1, xPercent: 2, ease: 'elastic.out' });
        this.timeline.play();
    }

}