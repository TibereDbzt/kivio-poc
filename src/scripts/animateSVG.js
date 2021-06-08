import gsap from 'gsap';
import { getCircleLength, getPathLength } from './calculateSVGLength';

const DOM = {
    container: document.querySelector('.svg-container'),
    svg: document.querySelector('svg'),
    shapes: {
        path: {
            el: document.querySelector('.path'),
            length: getPathLength(document.querySelector('.path'))
        },
        cities: [{
                el: document.querySelector('.city-point1'),
                length: getCircleLength(document.querySelector('.city-point1')),
                reachedAt: 287,
                isReached: false
            },
            {
                el: document.querySelector('.city-point2'),
                length: getCircleLength(document.querySelector('.city-point2')),
                reachedAt: 100,
                isReached: false
            }
        ]
    }
};

const setShapesAttributes = () => {
    DOM.shapes.path.el.style.strokeDasharray = DOM.shapes.path.length + ' ' + DOM.shapes.path.length;
    DOM.shapes.path.el.style.strokeDashoffset = DOM.shapes.path.length;
    DOM.shapes.cities.forEach(city => {
        city.el.style.strokeDasharray = city.length + ' ' + city.length;
        city.el.style.strokeDashoffset = city.length;
    });
};

const animatePath = () => {
    const scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    const progress = DOM.shapes.path.length * scrollPercentage;
    animateReachedCities(progress);
    DOM.shapes.path.el.style.strokeDashoffset = DOM.shapes.path.length - progress;
};

const animateReachedCities = (progress) => {
    DOM.shapes.cities.forEach(city => {
        if (!city.isReached && progress >= city.reachedAt) {
            gsap.to(city.el, { duration: 1, strokeDashoffset: 0, ease: "power4.out" });
            city.isReached = true;
        } else if (city.isReached && progress < city.reachedAt) {
            gsap.to(city.el, { duration: 1, strokeDashoffset: city.length, ease: "power4.out" });
            city.isReached = false;
        }
    });
}

window.addEventListener('load', setShapesAttributes);
window.addEventListener('scroll', animatePath);