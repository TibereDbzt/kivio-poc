import gsap from 'gsap';
import paper from 'paper';

export default class OperationAnimation {

    constructor(canvas) {
        this.DOM = {
            canvas: canvas,
        };
        paper.setup(this.DOM.canvas);
        this.route = this.createRoute();
        this.animateRoute();
        this.render();
    }

    animateRoute() {
        this.route.points.forEach(point => {
            this.route.path.lineBy(point);
        });
    }

    createRoute() {
        const path = new paper.Path();
        path.add(new paper.Point(80, 450)),
            path.strokeColor = 'black';
        path.closed = false;
        path.smooth();
        const points = [
            new paper.Point(80, 450),
            new paper.Point(130, 370),
            new paper.Point(80, 340),
            new paper.Point(140, 295),
            new paper.Point(130, 270),
            new paper.Point(140, 255),
            new paper.Point(38, 260),
            new paper.Point(55, 240),
            new paper.Point(42, 230),
            new paper.Point(50, 180)
        ];
        return { path: path, points: points };
    }

    render() {
        paper.view.draw();
    }

}