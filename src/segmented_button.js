'use strict';

var Bacon = require('./bacon');
var $ = require('jquery2');

module.exports = function() {
  function target(e) {
    return $(e.target);
  }

  function isEqual(a, b) {
    return a[0] === b[0];
  }

  var radio = $('.buttons-radio').asEventStream('click', 'button').map(target).skipDuplicates(isEqual);

  var stream = new Bacon.EventStream(function(subscriber) {
    radio.onValue(function($el) {
      $el.siblings().removeClass('active');
      $el.addClass('active');
      subscriber(new Bacon.Next(function() {
        return $el.text();
      }));
    });
    return function() { // unsub functionality here, this one's a no-op }
    };
  });

  stream.log();
};
