import gsap from 'gsap';
import gsapCore from 'gsap/gsap-core';
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
                circle: document.querySelector('.city-point1'),
                circleLength: getCircleLength(document.querySelector('.city-point1')),
                name: document.querySelector('.city-name1'),
                reachedAt: 287,
                isReached: false
            },
            {
                circle: document.querySelector('.city-point2'),
                name: document.querySelector('.city-name2'),
                circleLength: getCircleLength(document.querySelector('.city-point2')),
                reachedAt: 100,
                isReached: false
            }
        ]
    }
};

const setCityNamesPosition = () => {
    DOM.shapes.cities.forEach(city => {
        const circleBoundingRect = city.circle.getBoundingClientRect();
        const nameBoundingRect = city.name.getBoundingClientRect();
        city.name.style.top = `${circleBoundingRect.top - nameBoundingRect.height - 10}px`;
        city.name.style.left = `${circleBoundingRect.left - nameBoundingRect.width / 2}px`;
        gsap.set(city.name, { opacity: 0, translateY: 15 });
    });
};

const setShapesAttributes = () => {
    DOM.shapes.path.el.style.strokeDasharray = DOM.shapes.path.length + ' ' + DOM.shapes.path.length;
    DOM.shapes.path.el.style.strokeDashoffset = DOM.shapes.path.length;
    DOM.shapes.cities.forEach(city => {
        city.circle.style.strokeDasharray = city.circleLength + ' ' + city.circleLength;
        city.circle.style.strokeDashoffset = city.circleLength;
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
            gsap.to(city.circle, { duration: 1, strokeDashoffset: 0, ease: "power4.out" });
            gsap.to(city.name, { duration: 1, opacity: 1, translateY: 0, ease: "elastic.out" });
            city.isReached = true;
        } else if (city.isReached && progress < city.reachedAt) {
            gsap.to(city.circle, { duration: 1, strokeDashoffset: city.circleLength, ease: "power4.out" });
            gsap.to(city.name, { duration: 0.7, opacity: 0, translateY: 15, ease: "power4.out" });
            city.isReached = false;
        }
    });
}

window.addEventListener('resize', () => {
    setCityNamesPosition();
})
window.addEventListener('load', () => {
    setCityNamesPosition();
    setShapesAttributes();
});
window.addEventListener('scroll', animatePath);