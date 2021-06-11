import gsap from 'gsap';

const DOM = {
    route: document.querySelector('.route'),
    popup: document.querySelector('.popup')
};

let isOpen = false;
const tween = gsap.to(DOM.popup, { duration: 0.4, ease: "power4.out", opacity: 1, y: -50 }).pause();

const togglePopup = () => {
    isOpen ? tween.reverse() : tween.play();
    isOpen = !isOpen;
};

DOM.route.addEventListener('click', togglePopup);