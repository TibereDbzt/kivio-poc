import gsap from 'gsap';
import { EASES } from './../utils/animations';
import { getCircleLength, getPathLength } from './../utils/svg-maths';

export default class ManageTimeGraphic {

    constructor(container) {
        this.DOM = {
            container: container,
            window: {
                backbonePath: container.querySelector('[data-window-backbone]'),
                linePath: container.querySelector('[data-window-line]'),
                circle1Path: container.querySelector('[data-window-circle1]'),
                circle2Path: container.querySelector('[data-window-circle2]'),
                circle3Path: container.querySelector('[data-window-circle3]'),
            },
            screen: container.querySelector('[data-screen]'),
            driverSelectButton: container.querySelector('[data-driver-select-button]'),
            weekSelectButton: container.querySelector('[data-week-select-button]'),
            graph: container.querySelector('[data-graph]')
        };
        this.initSVG();
        this.driverSelectAnimation = this.createSelectButtonAnimation(this.DOM.driverSelectButton);
        this.weekSelectAnimation = this.createSelectButtonAnimation(this.DOM.weekSelectButton);
        this.graphAnimation = this.createGraphAnimation(this.DOM.graph);
        this.timeline = gsap.timeline();
        this.animateScreen();
    }

    initSVG() {
        const lengths = [getPathLength(this.DOM.window.backbonePath), getPathLength(this.DOM.window.linePath), getCircleLength(this.DOM.window.circle1Path), getCircleLength(this.DOM.window.circle2Path), getCircleLength(this.DOM.window.circle3Path)];
        Object.values(this.DOM.window).forEach((shape, i) => {
            shape.style.strokeDasharray = lengths[i] + ' ' + lengths[i];
            shape.style.strokeDashoffset = lengths[i];
        });
    }

    animateScreen() {
        gsap.set(this.DOM.screen, { scale: 1.2, skewX: 3, padding: 0, width: 180, rotate: 3, force3D: false });
        gsap.set(this.DOM.weekSelectButton, { display: 'none' });
        gsap.set(this.DOM.graph, { display: 'none' });
        gsap.set(this.DOM.driverSelectButton, { marginRight: 0 });
        this.timeline.from(this.DOM.screen, { scale: 1.4, width: 0, paddingLeft: 0, clearProps: 'padding', duration: 1, delay: 1, ease: EASES.markedOut, force3D: false });
        this.timeline.add(this.driverSelectAnimation);
        this.timeline.to(this.DOM.screen, { width: 364, duration: 1, delay: 1, ease: EASES.markedOut, force3D: false });
        this.timeline.set(this.DOM.weekSelectButton, { display: 'inline-block', width: 0, opacity: 0 });
        this.timeline.add(this.weekSelectAnimation);
        this.timeline.to(this.DOM.screen, { height: 200, force3D: false, duration: 1, ease: EASES.markedInOut });
        this.timeline.set(this.DOM.graph, { display: 'flex' });
        this.timeline.from(this.DOM.graph, { height: 0, duration: 1, ease: EASES.markedOut });
        this.timeline.add(this.graphAnimation, '<-0.7');
        this.timeline.to(this.DOM.screen, { scale: 0.9, translateX: -140, translateY: -60, skewX: 0, duration: 2, rotate: 0, ease: EASES.markedInOut });
        Object.values(this.DOM.window).forEach(shape => {
            this.timeline.to(shape, { strokeDashoffset: 0, duration: 1, ease: EASES.markedInOut }, '<+0.2');
        });
    }

    createSelectButtonAnimation(button) {
        const tl = gsap.timeline();
        const btn = button;
        const btnIcon = btn.querySelector('[data-select-button-icon]');
        const driverSelectDefaultItem = btn.querySelector('[data-select-default-item]');
        const driverSelectItems = btn.querySelectorAll('[data-select-item]');
        tl.fromTo(btn, { width: 0, opacity: 0, duration: 1, ease: EASES.markedOut, force3D: false }, { width: 150, opacity: 1 }, '-=1');
        tl.from(btnIcon, { opacity: 0, duration: 0.35, ease: 'linear', force3D: false }, '>-0.7');
        tl.from(btnIcon, { translateX: -15, duration: 0.5, ease: EASES.markedOut, force3D: false }, '<');
        tl.to(btnIcon, { rotation: -90, duration: 2, ease: EASES.markedInOut, force3D: false }, '>');
        tl.to(btn, { height: 120, duration: 2, ease: EASES.markedOut, force3D: false }, '<+0.7');
        tl.from(driverSelectItems[0], { opacity: 0, translateY: -10, duration: 0.8, ease: EASES.markedOut, force3D: false }, '<+0.2');
        tl.from(driverSelectItems[1], { opacity: 0, translateY: -10, duration: 0.8, ease: EASES.markedOut, force3D: false }, '<+0.2');
        tl.from(driverSelectItems[2], { opacity: 0, translateY: -10, duration: 0.8, ease: EASES.markedOut, force3D: false }, '<+0.2');
        tl.to(driverSelectDefaultItem, { opacity: 0, duration: 0.8, ease: EASES.markedOut, force3D: false }, '>+0.3');
        tl.to(driverSelectItems[2], { translateY: -77, duration: 0.8, ease: EASES.markedInOut, force3D: false }, '<-0.2');
        tl.to(btn, { height: 38, duration: 1.4, ease: EASES.markedInOut, force3D: false }, '<');
        return tl;
    }

    createGraphAnimation(graphic) {
        const tl = gsap.timeline();
        const graph = graphic;
        const date = graph.querySelector('[data-graph-date]');
        const weekday = graph.querySelector('[data-graph-weekday]');
        const markers = graph.querySelectorAll('[data-graph-marker]');
        const blocks = graph.querySelectorAll('[data-graph-block]');
        tl.to(graph, { height: 120, duration: 1, ease: EASES.markedOut });
        tl.from(date, { opacity: 0, translateY: 10, skewY: 13, duration: 1.2, ease: EASES.markedInOut });
        tl.from(weekday, { opacity: 0, translateY: 10, skewY: 13, duration: 1.2, ease: EASES.markedInOut }, '<+0.2');
        markers.forEach(marker => {
            tl.from(marker, { translateY: 10, opacity: 0, duration: 0.3, ease: EASES.markedOut }, '<+0.04');
        });
        blocks.forEach(block => {
            tl.from(block, { height: 0, duration: 1.4, ease: 'elastic.out' }, '<+0.1');
        });
        return tl;
    }

}