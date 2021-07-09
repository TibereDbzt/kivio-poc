import './../styles/features.sass';
import './../styles/modules/manage-time.sass';

import MenuAnimation from './modules/MenuAnimation';
import ManageTimeGraphic from './modules/ManageTimeGraphic';
import ManageTimeScreens from './modules/ManageTimeScreens';

const manageTimeSection1 = document.querySelector('section.manageTime.one');
const manageTimeSection2 = document.querySelector('section.manageTime.two');
const manageTimeSection3 = document.querySelector('section.manageTime.three');

new MenuAnimation(document.querySelector('[data-menu]'));
new ManageTimeGraphic(manageTimeSection1.querySelector('[data-container]'));
new ManageTimeScreens(manageTimeSection2.querySelector('[data-container]'));
// new ManageTimeScreens(manageTimeSection3.querySelector('[data-container]'));