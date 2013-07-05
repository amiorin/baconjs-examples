'use strict';

var $ = require('jquery2');
var Bacon = require('baconjs');

$.fn.asEventStream = Bacon.$.asEventStream;

module.exports = Bacon;
