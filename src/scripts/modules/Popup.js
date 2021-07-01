import gsap from 'gsap';
import './../../styles/modules/popup.sass';

const DOM = {
    route: document.querySelector('.route'),
    popup: document.querySelector('.popup')
};

let isOpen = false;
const tween = gsap.to(DOM.popup, { duration: 0.4, ease: "power4.out", opacity: 1, y: -50 }).pause();

const togglePopup = () => {
    if (isOpen) {
        tween.reverse();
        DOM.popup.style.pointerEvents = 'none';
    } else {
        tween.play();
        DOM.popup.style.pointerEvents = 'all';
    }
    isOpen = !isOpen;
};

DOM.route.addEventListener('click', togglePopup);