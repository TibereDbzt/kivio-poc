import gsap from 'gsap';
import paper from 'paper';
import './../../styles/modules/operation-animation.sass';
import { EASES } from './../utils/animations';
import { getCircleLength, getPathLength } from '../utils/svg-maths';

export default class OperationAnimation {

    constructor(container) {
        this.DOM = {
            container: container,
            routeSVG: container.querySelector('[data-operation-route]'),
            engineSVG: container.querySelector('[data-operation-engine]'),
            screenSVG: container.querySelector('[data-operation-screen]'),
        };
        console.log(this.DOM.routeSVG);
        this.ROUTE = {
            svg: container.querySelector('[data-operation-route]'),
            shapes: {
                path: {
                    el: this.DOM.routeSVG.querySelector('.path'),
                    length: getPathLength(this.DOM.routeSVG.querySelector('.path'))
                },
                cities: [{
                        circle: this.DOM.routeSVG.querySelector('.city-point1'),
                        circleLength: getCircleLength(this.DOM.routeSVG.querySelector('.city-point1')),
                        name: this.DOM.routeSVG.querySelector('.city-name1'),
                        reachedAt: 287,
                        isReached: false
                    },
                    {
                        circle: this.DOM.routeSVG.querySelector('.city-point2'),
                        name: this.DOM.routeSVG.querySelector('.city-name2'),
                        circleLength: getCircleLength(this.DOM.routeSVG.querySelector('.city-point2')),
                        reachedAt: 100,
                        isReached: false
                    }
                ]
            }
        }
        this.setCityNamesPosition();
        this.setShapesAttributes();
        gsap.ticker.add(this.animateReachedCities);
        this.animateRoute();
    }

    setCityNamesPosition() {
        this.ROUTE.shapes.cities.forEach(city => {
            const circleBoundingRect = city.circle.getBoundingClientRect();
            const nameBoundingRect = city.name.getBoundingClientRect();
            city.name.style.top = `${circleBoundingRect.top - nameBoundingRect.height - 10}px`;
            city.name.style.left = `${circleBoundingRect.left - nameBoundingRect.width / 2}px`;
            gsap.set(city.name, { opacity: 0, translateY: 15 });
        });
    }

    setShapesAttributes() {
        this.ROUTE.shapes.path.el.style.strokeDasharray = this.ROUTE.shapes.path.length + ' ' + this.ROUTE.shapes.path.length;
        this.ROUTE.shapes.path.el.style.strokeDashoffset = this.ROUTE.shapes.path.length;
        this.ROUTE.shapes.cities.forEach(city => {
            city.circle.style.strokeDasharray = city.circleLength + ' ' + city.circleLength;
            city.circle.style.strokeDashoffset = city.circleLength;
        });
    };

    animateRoute() {
        gsap.to(this.ROUTE.shapes.path, { strokeDashoffset: 0, duration: 2, ease: EASES.markedInOut });
    }

    animateReachedCities() {
        this.ROUTE.shapes.cities.forEach(city => {
            if (!city.isReached && this.ROUTE.shapes.path.length >= city.reachedAt) {
                gsap.to(city.circle, { duration: 1, strokeDashoffset: 0, ease: "power4.out" });
                gsap.to(city.name, { duration: 1, opacity: 1, translateY: 0, ease: "elastic.out" });
                city.isReached = true;
            } else if (city.isReached && this.ROUTE.shapes.path.length < city.reachedAt) {
                gsap.to(city.circle, { duration: 1, strokeDashoffset: city.circleLength, ease: "power4.out" });
                gsap.to(city.name, { duration: 0.7, opacity: 0, translateY: 15, ease: "power4.out" });
                city.isReached = false;
            }
        });
    }

}