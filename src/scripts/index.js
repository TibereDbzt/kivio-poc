import './modules/DrawSVGOnScroll';
import './modules/Popup';
import './../styles/main.sass';

import LogoAnimation from './modules/LogoAnimation';
import MenuAnimation from './modules/MenuAnimation';
import { CanvasShapesTransition, LogoOverlayTransition } from './modules/PagesTransition';
import PagesTransition from './modules/PagesTransition';

const loader = new LogoAnimation(document.querySelector('.loader'));
new MenuAnimation(document.querySelector('[data-menu]'));
new CanvasShapesTransition(document.querySelector('[data-canvas-pages-transition'));
const pagesTransition = new LogoOverlayTransition(document.querySelector('[data-transition-overlay]'));

window.addEventListener('load', () => {
    loader.animate();
    setTimeout(() => {
        loader.remove();
    }, 10);
});