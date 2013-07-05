'use strict';

var $ = require('jquery2');
var button = require('./button');
require('./segmented_button')();


var minusOnes = button({
  $el: $('#minusOne'),
  value: -1,
});

var plusOnes = button({
  $el: $('#plusOne'),
  value: +1
});

var score = minusOnes.merge(plusOnes).scan(0, function(sum, value) {
  return sum + value;
});

score.assign($('#score'), 'text');
