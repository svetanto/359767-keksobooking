'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.isEscPressed = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  window.isEnterPressed = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  window.shuffleArray = function (array) {
    for (var i = array.length - 1; i; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var swap = array[i];
      array[i] = array[j];
      array[j] = swap;
    }
    return array;
  };

  window.generateRandomInteger = function (fromNumber, toNumber) {
    return Math.round(Math.random() * (toNumber - fromNumber) + fromNumber);
  };

  window.generateRandomArray = function (min, max, number) {
    var array = [];
    for (var i = 0; i < number; i++) {
      array.push(window.generateRandomInteger(min, max));
    }
    return array;
  };

  window.generateRandomArrayfromInput = function (input, number) {
    var array = [];
    for (var i = 0; i < number; i++) {
      array.push(input[window.generateRandomInteger(0, input.length - 1)]);
    }
    return array;
  };

})();
