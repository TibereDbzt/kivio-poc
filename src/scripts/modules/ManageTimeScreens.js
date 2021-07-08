import gsap from 'gsap';
import { EASES } from './../utils/animations';
import entireScreenImage from './../../assets/medias/entire_widget.PNG';
import settingsBarImage from './../../assets/medias/widget_settings_bar.PNG';
import tableHeaderImage from './../../assets/medias/widget_table_header.PNG';

import mondayGraphImage from './../../assets/medias/widget_monday_graph.PNG';
import mondayStatsImage from './../../assets/medias/widget_monday_stats.PNG';

import tuesdayGraphImage from './../../assets/medias/widget_tuesday_graph.PNG';
import tuesdayStatsImage from './../../assets/medias/widget_tuesday_stats.PNG';

import wednesdayGraphImage from './../../assets/medias/widget_wednesday_graph.PNG';
import wednesdayStatsImage from './../../assets/medias/widget_wednesday_stats.PNG';

import thursdayGraphImage from './../../assets/medias/widget_thursday_graph.PNG';
import thursdayStatsImage from './../../assets/medias/widget_thursday_stats.PNG';

export default class ManageTimeScreens {

    constructor(container) {
        this.DOM = {
            container: container,
            // screen: container.querySelector('[data-entire-screen]')
            settingsBar: container.querySelector('[data-img-settings-bar]'),
            tableHeader: container.querySelector('[data-img-table-header]'),

            mondayGraph: container.querySelector('[data-img-monday-graph]'),
            mondayStats: container.querySelector('[data-img-monday-stats]'),

            tuesdayGraph: container.querySelector('[data-img-tuesday-graph]'),
            tuesdayStats: container.querySelector('[data-img-tuesday-stats]'),

            wednesdayGraph: container.querySelector('[data-img-wednesday-graph]'),
            wednesdayStats: container.querySelector('[data-img-wednesday-stats]'),

            thursdayGraph: container.querySelector('[data-img-thursday-graph]'),
            thursdayStats: container.querySelector('[data-img-thursday-stats]'),
        };
        this.DOM.settingsBar.src = settingsBarImage;
        this.DOM.tableHeader.src = tableHeaderImage;

        this.DOM.mondayGraph.src = mondayGraphImage;
        this.DOM.mondayStats.src = mondayStatsImage;

        this.DOM.tuesdayGraph.src = tuesdayGraphImage;
        this.DOM.tuesdayStats.src = tuesdayStatsImage;

        this.DOM.wednesdayGraph.src = wednesdayGraphImage;
        this.DOM.wednesdayStats.src = wednesdayStatsImage;

        this.DOM.thursdayGraph.src = thursdayGraphImage;
        this.DOM.thursdayStats.src = thursdayStatsImage;

        // this.DOM.screen.src = entireScreenImage;
        this.timeline = gsap.timeline();
        this.animateUI();
    }

    animateUI() {
        this.timeline.from(this.DOM.settingsBar, { translateY: -40, opacity: 0, duration: 0.4, ease: EASES.markedOut });
        this.timeline.from(this.DOM.tableHeader, { translateY: -40, opacity: 0, duration: 0.4, ease: EASES.markedOut }, '<+0.2');

        this.timeline.from(this.DOM.mondayGraph, { translateY: -40, skewX: 20, opacity: 0, duration: 0.4, ease: EASES.markedOut }, '<+0.2');
        this.timeline.from(this.DOM.mondayStats, { translateX: -100, opacity: 0, duration: 1.3, ease: EASES.markedOut }, '<+0.2');

        this.timeline.from(this.DOM.tuesdayGraph, { translateY: -40, skewX: 20, opacity: 0, duration: 0.4, ease: EASES.markedOut }, '<+0.2');
        this.timeline.from(this.DOM.tuesdayStats, { translateX: -100, opacity: 0, duration: 1.3, ease: EASES.markedOut }, '<+0.2');

        this.timeline.from(this.DOM.wednesdayGraph, { translateY: -40, skewX: 20, opacity: 0, duration: 0.4, ease: EASES.markedOut }, '<+0.2');
        this.timeline.from(this.DOM.wednesdayStats, { translateX: -100, opacity: 0, duration: 1.3, ease: EASES.markedOut }, '<+0.2');

        this.timeline.from(this.DOM.thursdayGraph, { translateY: -40, skewX: 20, opacity: 0, duration: 0.4, ease: EASES.markedOut }, '<+0.2');
        this.timeline.from(this.DOM.thursdayStats, { translateX: -100, opacity: 0, duration: 1.3, ease: EASES.markedOut }, '<+0.2');
    }

}