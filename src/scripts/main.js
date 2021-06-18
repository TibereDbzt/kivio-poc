import './animateSVG';
import './popup';
import './../styles/main.sass';

import MenuAnimation from './menu-animation';
import { CanvasShapesTransition } from './pages-transition';

new MenuAnimation(document.querySelector('[data-menu]'));
new CanvasShapesTransition(document.querySelector('[data-canvas-pages-transition'));