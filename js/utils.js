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

  var alertMessageContainer = document.querySelector('.alert-message');
  var alertMessageText = alertMessageContainer.querySelector('.alert-message__text');
  var alertMessageCloseButton = alertMessageContainer.querySelector('.alert-message__close');

  window.renderErrorMessage = function (errMessage) {
    alertMessageContainer.style = 'background-color: red;';
    alertMessageText.textContent = 'При обращении к серверу произошла ошибка: ' + errMessage;
    alertMessageCloseButton.textContent = 'Вот горе-то...';
    alertMessageContainer.classList.remove('hidden');
    alertMessageCloseButton.addEventListener('click', function () {
      alertMessageContainer.classList.add('hidden');
    });
  };

  window.renderSuccessMessage = function (form) {
    form.reset();
    alertMessageContainer.style = 'background-color: green;';
    alertMessageText.textContent = 'Данные формы успешно отправлены на сервер';
    alertMessageCloseButton.textContent = 'Радость-то какая!';
    alertMessageContainer.classList.remove('hidden');
    alertMessageCloseButton.addEventListener('click', function () {
      alertMessageContainer.classList.add('hidden');
    });
  };

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.debounce = function (functionToBeDebounced) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(functionToBeDebounced, DEBOUNCE_INTERVAL);
  };

  window.checkIsFileImageType = function (inputFileName) {
    return ['gif', 'jpg', 'jpeg', 'png', 'webp'].some(function (it) {
      return inputFileName.toLowerCase().endsWith(it);
    });
  };

  var fileURL;

  window.readFiles = function (inputFiles) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      fileURL = reader.result;
      console.log(fileURL);
    });
    reader.readAsDataURL(inputFiles);
    console.log(fileURL);
    return fileURL;
  };

})();
