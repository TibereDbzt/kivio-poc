import LoaderAnimation from './loader-animation';
import MenuAnimation from './menu-animation';
// import PagesTransition from './pages-transition';

const loader = new LoaderAnimation(document.querySelector('.loader'));
const menu = new MenuAnimation(document.querySelector('[data-menu]'));
// const pagesTransition = new PagesTransition(document.querySelector('[data-transition-overlay]'));

window.addEventListener('load', loader.animate());