import gsap from 'gsap';
import { EASES } from '../utils/animations';
import { getDistanceTo } from '../utils/getters';

export default class RollerSentence {

    constructor(el) {
        const rollers = el.querySelectorAll('[data-roller-mask');
        this.rollers = [{
                mask: rollers[0],
                container: rollers[0].querySelector('[data-roller-container]'),
                items: rollers[0].querySelectorAll('[data-roller-item]'),
                index: rollers[0].querySelectorAll('[data-roller-item]').length
            },
            {
                mask: rollers[1],
                container: rollers[1].querySelector('[data-roller-container]'),
                items: rollers[1].querySelectorAll('[data-roller-item]'),
                index: -1
            }
        ];
        this.timeline = gsap.timeline().delay(1);
        this.initState();
        this.roll();
    }

    initState() {
        this.translateY = -this.rollers[0].mask.getBoundingClientRect().height;
        gsap.set(this.rollers[0].container, {
            translateY: getDistanceTo(this.rollers[0].container, 'bottom', this.rollers[0].mask, 'top')
        })
        gsap.set(this.rollers[1].container, {
            translateY: this.rollers[1].mask.getBoundingClientRect().height
        })
    }

    roll() {
        if (this.rollers[0].index === 0) this.rollers[0].index = this.rollers[0].items.length - 1;
        else this.rollers[0].index--;

        if (this.rollers[1].index === this.rollers[1].items.length - 1) this.rollers[1].index = 0;
        else this.rollers[1].index++;

        this.timeline.to(this.rollers[0].container, {
            translateY: this.rollers[0].items[this.rollers[0].index].getBoundingClientRect().height * (this.rollers[0].items.length - this.rollers[0].index) - this.rollers[0].container.getBoundingClientRect().height,
            duration: 1,
            delay: 1,
            ease: EASES.markedInOut
        });

        this.timeline.to(this.rollers[1].container, {
            translateY: -this.rollers[1].items[this.rollers[1].index].offsetTop,
            duration: 1,
            ease: EASES.markedInOut,
            onComplete: () => {
                this.roll();
            }
        }, '<');
    }

}