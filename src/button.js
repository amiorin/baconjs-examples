'use strict';

var Bacon = require('./bacon');
var $ = require('jquery2');
var _ = require('lodash');

module.exports = function(options) {
  var opts = _.defaults(options, {
    rate: 10,
    delay: 300,
    value: true
  });

  var $el    = opts.$el,
      rate   = opts.rate,
      delay  = opts.delay,
      value  = opts.value,
      period = 1000 / rate,
      cnt    = delay / period;

  var initialStatus = {
    mousedown: false,
    counter: cnt,
    value: false
  };

  var mousedown = $el.asEventStream('mousedown').map('mousedown'),
      mouseup = $(document).asEventStream('mouseup').map('mouseup'),
      repeat = Bacon.interval(period, 'tick'),
      merged = Bacon.mergeAll(mousedown, mouseup, repeat);

  var statusProperty = merged.scan(initialStatus, function(status, event) {
    if (event === 'mousedown') {
      status.mousedown = true;
      status.value = true;
      return status;
    } else if (event === 'mouseup') {
      status.mousedown = false;
      status.value = false;
      return status;
    } else if (event === 'tick') {
      if (status.counter === 0 && status.mousedown) {
        status.value = true;
        return status;
      } else if (status.mousedown) {
        status.counter -= 1;
        status.value = false;
        return status;
      } else {
        status.counter = cnt;
        return status;
      }
    }
  });

  var isTrue = function(status) {
    return status.value === true;
  };

  return statusProperty.filter(isTrue).map(value).changes();
};
