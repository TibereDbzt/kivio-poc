const getCircleLength = (el) => {
    return Math.round(2 * Math.PI * parseInt(el.getAttribute('r'), 10)) + 3;
};

const getPathLength = (el) => {
    return el.getTotalLength();
};

export { getCircleLength, getPathLength };