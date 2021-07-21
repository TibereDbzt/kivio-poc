import './../styles/features.sass';
import './../styles/modules/manage-time.sass';

import LogoAnimation from './modules/LogoAnimation';
import MenuAnimation from './modules/MenuAnimation';
import ManageTimeGraphic from './modules/ManageTimeGraphic';
import ManageTimeScreens from './modules/ManageTimeScreens';
import OperationAnimation from './modules/OperationAnimation';
import ConceptAnimation from './modules/ConceptAnimation';
import OverviewGraph from './modules/OverviewGraph';
import RollerSentence from './modules/RollerSentence';
import CatchphrasesAnimation from './modules/CatchphrasesAnimation';

const loader = new LogoAnimation(document.querySelector('.loader'));
const manageTimeHero = document.querySelector('section.operation');
const manageTimeSection1 = document.querySelector('section.manageTime.one');
const manageTimeSection2 = document.querySelector('section.manageTime.two');
const manageTimeSection3 = document.querySelector('section.manageTime.three');

new MenuAnimation(document.querySelector('[data-menu]'));
// new OperationAnimation(manageTimeHero.querySelector('[data-operation]'));
new ManageTimeGraphic(manageTimeSection1.querySelector('[data-container]'));
new ManageTimeScreens(manageTimeSection2.querySelector('[data-container]'));
new ConceptAnimation(document.querySelector('[data-concept]'));
new OverviewGraph(document.querySelector('[data-overview-svg]'));
new RollerSentence(document.querySelector('[data-roller-sentence]'));
new CatchphrasesAnimation(document.querySelector('[data-catchphrases]'));
// new ManageTimeScreens(manageTimeSection3.querySelector('[data-container]'));

window.addEventListener('load', () => {
    loader.animate();
    // setTimeout(() => {
    //     loader.remove();
    // }, 0);
});