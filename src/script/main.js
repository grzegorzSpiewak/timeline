'use strict';

const Timeline = require('./front/timeline')
const Labels = require('./common/labels');

/**
 * Creates labels on progressbar and handle animation
 */
Labels.forEach(label => {
  const timelineFirst = new Timeline({
    date: label.date,
    message: label.message,
    icon: label.icon
  });
  timelineFirst.initialize();
});
