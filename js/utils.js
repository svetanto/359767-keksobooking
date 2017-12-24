'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  var alertMessageContainer = document.querySelector('.alert-message');
  var alertMessageText = alertMessageContainer.querySelector('.alert-message__text');
  var alertMessageCloseButton = alertMessageContainer.querySelector('.alert-message__close');

  window.utils = {
    'isEscPressed': function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    'isEnterPressed': function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    'renderErrorMessage': function (errMessage) {
      alertMessageContainer.style = 'background-color: red;';
      alertMessageText.textContent = 'При обращении к серверу произошла ошибка: ' + errMessage;
      alertMessageCloseButton.textContent = 'Вот горе-то...';
      alertMessageContainer.classList.remove('hidden');
      alertMessageCloseButton.addEventListener('click', function () {
        alertMessageContainer.classList.add('hidden');
      });
    },

    'renderSuccessMessage': function (form) {
      form.reset();
      window.clearDependencies();
      window.clearFormImages(form);
      alertMessageContainer.style = 'background-color: green;';
      alertMessageText.textContent = 'Данные формы успешно отправлены на сервер';
      alertMessageCloseButton.textContent = 'Радость-то какая!';
      alertMessageContainer.classList.remove('hidden');
      alertMessageCloseButton.addEventListener('click', function () {
        alertMessageContainer.classList.add('hidden');
      });
    },

    'debounce': function (functionToBeDebounced) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(functionToBeDebounced, DEBOUNCE_INTERVAL);
    },

    'checkIsFileImageType': function (inputFileName) {
      return ['gif', 'jpg', 'jpeg', 'png', 'webp'].some(function (it) {
        return inputFileName.toLowerCase().endsWith(it);
      });
    }
  };

})();
