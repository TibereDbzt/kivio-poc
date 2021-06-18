import gsap from 'gsap';

export default class MenuAnimation {

    constructor(container) {
        this.menu = container;
        this.logo = document.querySelector('[data-logo-nav]');
        this.entries = container.querySelectorAll('[data-menu-entry]');
        this.entries = [...this.entries].map(entry => {
            return {
                target: entry,
                text: entry.querySelector('[data-menu-entry-text]'),
                shapes: {
                    circleTopLeft: entry.querySelector('.circleTopLeft'),
                    triangleTopRight: entry.querySelector('.triangleTopRight'),
                    circleBottomLeft: entry.querySelector('.circleBottomLeft'),
                    triangleBottomRight: entry.querySelector('.triangleBottomRight')
                }
            }
        });
        this.lastScrollWentDown = false;
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        this.initEvents();
    }

    initEvents() {
        this.entries.forEach(entry => {
            entry.target.addEventListener('mouseenter', () => {
                this.animateInEntry(entry);
            });
            entry.target.addEventListener('mouseleave', () => {
                this.animateOutEntry(entry);
            });
        });
        document.addEventListener('scroll', e => {
            const scrollTop = document.documentElement.scrollTop;
            const isScrollingDown = scrollTop > this.scrollTop;
            this.scrollTop = scrollTop;
            if ((isScrollingDown && this.lastScrollWentDown) || (!isScrollingDown && !this.lastScrollWentDown)) return;
            this.lastScrollWentDown = isScrollingDown;
            this.toggleHideKivioName();
        });
    }

    animateInEntry(entry) {
        this.tweens = [
            gsap.to(entry.shapes.circleTopLeft, { translateX: -5, translateY: -5, scale: 1, duration: 0.8, opacity: 1, ease: 'elastic.out' }).resume(),
            gsap.to(entry.shapes.triangleTopRight, { translateX: 2, translateY: -5, duration: 0.5, rotate: 220, scale: 1, opacity: 1, ease: 'power4.out' }).resume(),
            gsap.to(entry.shapes.circleBottomLeft, { translateX: 0, translateY: 8, duration: 0.4, opacity: 1, scale: 1, ease: 'back.out' }).resume(),
            gsap.to(entry.shapes.triangleBottomRight, { translateX: 5, translateY: 5, duration: 0.9, rotate: 340, scale: 1, opacity: 1, ease: 'power4.out' }).resume()
        ]
    }

    animateOutEntry(entry) {
        this.tweens.forEach(tween => {
            tween.reverse();
        });
    }

    toggleHideKivioName() {
        if (this.lastScrollWentDown) gsap.to(this.logo.querySelector('[data-logo-text]'), { x: -200, opacity: 0, skewX: 15, duration: 0.4, ease: 'power4.out' });
        else gsap.to(this.logo.querySelector('[data-logo-text]'), { x: 0, opacity: 1, duration: 0.4, skewX: 0, ease: 'power4.out' });
    }

}