const getMousePos = e => {
    return { x: e.clientX, y: e.clientY };
};

const getClientSize = () => {
    return { width: window.innerWidth, height: window.innerHeight };
};

const getDistanceTo = (element, screenSide) => {
    const bounds = element.getBoundingClientRect();
    if (screenSide === 'top') return Math.ceil(bounds.bottom);
    else if (screenSide === 'right') return Math.ceil((windowSize.width - bounds.right));
    else if (screenSide === 'bottom') return Math.ceil((windowSize.height - bounds.top));
    else if (screenSide === 'left') return Math.ceil(bounds.left);
    else return null;
};

window.addEventListener('resize', () => windowSize = getClientSize());
window.addEventListener('mousemove', e => mousePos = getMousePos(e));

let mousePos = { x: -10, y: -10 };
let windowSize = getClientSize();

export { mousePos, windowSize, getDistanceTo };