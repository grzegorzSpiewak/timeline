/* eslint-env browser, node */
'use strict'
/**
 * Class to create timeline
 * @class
 * @example
 * const feature = new Timeline({
 *  date: 'DD/MM/YYYY' in string
 *  message: 'Text' in string
 *  icon: selected font awesome icon in string
 * });
 * feature.initialize();
 */

class Timeline {
  /**
   * @constructor
   * @param {Object} config required parameter
   * @param {HTMLElement} config.$timeline anchor in HTML
   * @param {number} config.$select Amount of the days in the month
   */
  constructor(config) {
    this.config = config;
    this.config.$timeline = document.querySelector('.timeline');
    this.config.$progressbar = this.config.$timeline.querySelector('.timeline__progressbar');
    this.config.$select = document.querySelector('select');
    this.config.numberOfDays = 30;
  }

  /**
  * Creates a div with label and place it progressbar.
  * @returns {HTMLElement}
  */
  newLabel() {
    const timeline = this.config.$timeline;
    const icon = this.config.icon;
    const label = document.createElement('div');
    const iconWrapper = document.createElement('div');

    iconWrapper.innerHTML = icon;
    iconWrapper.className = 'timeline__label__icon';
    this.iconWrapper = iconWrapper;
    label.appendChild(iconWrapper);
    label.className = 'timeline__label';
    timeline.appendChild(label);
    this.label = label;
    this.newLabelPosition();
    this.addLabelDescription();
  }

  /**
  * Creates a div with label details.
  * @returns {HTMLElement}
  */
  addLabelDescription() {
    const label = this.label;
    const message = this.config.message;
    const date = this.config.date;
    const detailsWrapper = document.createElement('div');
    const header = document.createElement('h1');
    const article = document.createElement('article');

    header.innerHTML = date;
    article.innerHTML = message;
    const informations = [ header, article ];
    informations.forEach(info => {
      detailsWrapper.appendChild(info);
    })
    detailsWrapper.className = 'timeline__label__details';
    label.appendChild(detailsWrapper);
  }

  /**
  * Changess label position accoridng to Date
  * @returns {void}
  */
  newLabelPosition() {
    const timelineLength = this.config.$timeline.offsetWidth;
    const numberOfDays = this.config.numberOfDays;
    const date = this.config.date;
    const label = this.label;
    const dayLength = Math.round(timelineLength / numberOfDays);
    const labelDay = parseInt(date.slice(0, 2));
    const postitionOnProgressbar = labelDay * dayLength;

    label.style.left = postitionOnProgressbar + 'px';
    this.labelDay = labelDay
  }

  /**
  * Adjust lenght of progress bar according to numebr of day choosen in select
  * @returns {void}
  */
  progressbar(event) {
    const selectValue = this.config.$select.value;
    const timelineLength = this.config.$timeline.offsetWidth;
    const progressbar = this.config.$progressbar;
    const numberOfDays = this.config.numberOfDays;
    const dayLength = Math.round(timelineLength / numberOfDays);
    const progressbarLength = dayLength * selectValue;

    if(selectValue >= numberOfDays) {
      progressbar.style.width = timelineLength  + 'px';
    } else {
      progressbar.style.width = progressbarLength + 'px';
    }
    this.toggleColor();
  }

  /**
  * Toggles active class for icon wrapper
  * @returns {void}
  */
  toggleColor() {
    const iconWrapper = this.iconWrapper
    const labelDay = this.labelDay;
    const selectValue = this.config.$select.value;

    if(selectValue >= labelDay) {
      iconWrapper.classList.add('active')
    } else {
      iconWrapper.classList.remove('active')
    }
  }

  /**
  * Resets label position on window resize
  * @returns {void}
  */
  resize() {
    const label = this.label;
    const progressbar = this.config.$progressbar;

    progressbar.style.width = 0 + 'px';
    label.style.left = 0 + 'px';
    this.newLabelPosition();
    this.progressbar();
  }

  /**
  * Atach functionality to events
  * @returns {void}
  */
  eventHandler() {
    const select = this.config.$select;
    select.addEventListener('change', this.progressbar.bind(this));
    window.addEventListener('load', this.newLabel.bind(this));
    window.addEventListener('resize', this.resize.bind(this));
  }

  /**
  * initialize all actions
  * @returns {void}
  */
  initialize() {
    this.eventHandler();
  }
}

module.exports = Timeline;
