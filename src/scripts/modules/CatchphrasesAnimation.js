import gsap from 'gsap';
import { EASES } from '../utils/animations';
import './../../styles/modules/catchphrases.sass';

export default class CatchphrasesAnimation {

    constructor(container) {
        this.crashPhrase = {
            svg: container.querySelector('[data-crash]'),
            get: container.querySelector('[data-crash-get]'),
            gmail: container.querySelector('[data-crash-gmail]'),
            when: container.querySelector('[data-crash-when]'),
            car: container.querySelector('[data-crash-car]'),
        };
        this.fuelPhrase = {
            svg: container.querySelector('[data-fuel]'),
            track: container.querySelector('[data-fuel-track]'),
            pump: container.querySelector('[data-fuel-pump]'),
            your: container.querySelector('[data-fuel-your]'),
            scooter: container.querySelector('[data-fuel-scooter]'),
        };
        this.locatePhrase = {
            svg: container.querySelector('[data-locate]'),
            check: container.querySelector('[data-locate-check]'),
            marker: container.querySelector('[data-locate-marker]'),
            your: container.querySelector('[data-locate-your]'),
            boat: container.querySelector('[data-locate-boat]'),
        };
        this.timeline = gsap.timeline().delay(3);
        this.initState();
        this.timeline.add(this.animateCrashPhrase());
        this.timeline.add(this.animateFuelPhrase());
        this.timeline.add(this.animateLocatePhrase());
    }

    initState() {
        gsap.set(this.crashPhrase.svg, { autoAlpha: 0 });
        gsap.set(this.fuelPhrase.svg, { autoAlpha: 0 });
        gsap.set(this.locatePhrase.svg, { autoAlpha: 0 });
    }

    animateCrashPhrase() {
        const timeline = gsap.timeline();
        timeline.set(this.crashPhrase.svg, { autoAlpha: 1 });
        timeline.from(this.crashPhrase.get, {
            autoAlpha: 0,
            translateX: -50,
            translateY: 20,
            duration: 0.6,
            ease: EASES.markedOut
        });
        timeline.from(this.crashPhrase.gmail, {
            autoAlpha: 0,
            scale: 0.5,
            duration: 0.6,
            ease: EASES.markedOut
        }, '>-=0.3');
        timeline.from(this.crashPhrase.when, {
            autoAlpha: 0,
            translateY: -40,
            duration: 0.8,
            ease: EASES.markedOut
        }, '>-=0.3');
        timeline.from(this.crashPhrase.car, {
            autoAlpha: 0,
            translateX: 80,
            duration: 0.6,
            ease: EASES.markedOut
        }, '>-=0.3');
        timeline.to(this.crashPhrase.svg, {
            autoAlpha: 0,
            delay: 1,
        })
        return timeline;
    }

    animateFuelPhrase() {
        const timeline = gsap.timeline();
        timeline.set(this.fuelPhrase.svg, { autoAlpha: 1 });
        timeline.from(this.fuelPhrase.track, {
            autoAlpha: 0,
            translateY: 60,
            scaleY: 1.5,
            duration: 0.6,
            ease: EASES.markedOut
        });
        timeline.from(this.fuelPhrase.pump, {
            autoAlpha: 0,
            scale: 0.5,
            duration: 0.6,
            ease: EASES.markedOut
        }, '>-=0.3');
        timeline.from(this.fuelPhrase.your, {
            autoAlpha: 0,
            translateY: -40,
            rotation: '25deg',
            duration: 0.8,
            ease: EASES.markedOut
        }, '>-=0.3');
        timeline.from(this.fuelPhrase.scooter, {
            autoAlpha: 0,
            translateX: 80,
            rotation: '15deg',
            duration: 0.6,
            ease: EASES.markedOut
        }, '>-=0.3');
        timeline.to(this.fuelPhrase.svg, {
            autoAlpha: 0,
            delay: 1,
        })
        return timeline;
    }

    animateLocatePhrase() {
        const timeline = gsap.timeline();
        timeline.set(this.locatePhrase.svg, { autoAlpha: 1 });
        timeline.from(this.locatePhrase.check, {
            autoAlpha: 0,
            translateY: 60,
            scaleY: 1.5,
            duration: 0.6,
            ease: EASES.markedOut
        });
        timeline.from(this.locatePhrase.marker, {
            autoAlpha: 0,
            scale: 0.5,
            duration: 0.6,
            ease: EASES.markedOut
        }, '>-=0.3');
        timeline.from(this.locatePhrase.your, {
            autoAlpha: 0,
            translateY: -40,
            rotation: '25deg',
            duration: 0.8,
            ease: EASES.markedOut
        }, '>-=0.3');
        timeline.from(this.locatePhrase.boat, {
            autoAlpha: 0,
            translateX: 80,
            rotation: '15deg',
            duration: 0.6,
            ease: EASES.markedOut
        }, '>-=0.3');
        timeline.to(this.locatePhrase.svg, {
            autoAlpha: 0,
            delay: 1,
        })
        return timeline;
    }

}