import LoaderAnimation from './loader-animation';

const loader = new LoaderAnimation(document.querySelector('.loader'));

window.addEventListener('load', loader.animate());