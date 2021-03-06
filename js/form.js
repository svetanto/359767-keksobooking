'use strict';

(function () {

  var MIN_PRICE_CONFIG = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var ROOMS_SYNC_CAPACITY = {
    1: [false, true, false, false],
    2: [false, true, true, false],
    3: [false, true, true, true],
    100: [true, false, false, false]
  };

  // Синхронизация полей «время заезда» и «время выезда»
  var checkinInput = document.querySelector('#timein');
  var checkoutInput = document.querySelector('#timeout');

  checkinInput.addEventListener('input', function () {
    window.synchronizeFields(checkinInput, checkoutInput, syncCheckTime(checkoutInput, checkinInput));
  });
  checkoutInput.addEventListener('input', function () {
    window.synchronizeFields(checkoutInput, checkinInput, syncCheckTime(checkinInput, checkoutInput));
  });

  function syncCheckTime(syncWhat, syncWith) {
    syncWhat.value = syncWith.value;
  }

  // Синхронизация поля «Тип жилья» с минимальной ценой в поле «Цена за ночь, руб.»

  var typeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  priceInput.min = MIN_PRICE_CONFIG.flat;

  typeInput.addEventListener('input', function () {
    window.synchronizeFields(priceInput, typeInput, setMinPrice);
  });

  function setMinPrice(syncWhat, syncWith) {
    syncWhat.min = MIN_PRICE_CONFIG[syncWith.value];
    if (Number(syncWhat.value) < Number(syncWhat.min)) {
      syncWhat.value = syncWhat.min;
    }
  }

  // Синхронизация поля «Кол-во комнат» с полем «Количество мест»

  var maxNumberOfGuests = 3;
  var guestsNumberOptions = [];
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  for (var i = maxNumberOfGuests; i >= 0; i--) {
    guestsNumberOptions.push(capacity.querySelector('option[value="' + (3 - i) + '"]'));
  }

  roomNumber.addEventListener('input', function (evt) {
    window.synchronizeFields(capacity, roomNumber, setGuestsNumberOptions(evt));
  });

  function setGuestsNumberOptions(evt) {
    for (var j = 0; j <= maxNumberOfGuests; j++) {
      guestsNumberOptions[j].disabled = !ROOMS_SYNC_CAPACITY[evt.target.value][j];
    }
    capacity.value = (roomNumber.value === '100') ? 0 : roomNumber.value;
  }

  // Подсветка невалидных полей
  var watchedInputs = [
    document.querySelector('#title'),
    document.querySelector('#price'),
    document.querySelector('#address')
  ];

  watchedInputs.forEach(function (item) {
    item.addEventListener('invalid', function (evt) {
      evt.target.style = 'border: 2px solid red';
    });
    item.addEventListener('blur', function (evt) {
      evt.target.style = 'border: 1px solid #eee';
    });
  });

  window.clearDependencies = function () {
    priceInput.min = MIN_PRICE_CONFIG.flat;
    for (var j = 0; j <= maxNumberOfGuests; j++) {
      guestsNumberOptions[j].disabled = !ROOMS_SYNC_CAPACITY[1][j];
    }
  };

  var form = document.querySelector('.notice__form');

  window.clearFormImages = function (formToClear) {
    var avatarImage = formToClear.querySelector('.notice__preview img');
    avatarImage.src = 'img/muffin.png';
    var housingImagesContainer = form.querySelector('.form__photo-container');
    var housingImages = housingImagesContainer.querySelectorAll('img');
    if (housingImages) {
      housingImages.forEach(function (item) {
        housingImagesContainer.removeChild(item);
      });
    }
  };

  form.addEventListener('reset', function () {
    window.clearFormImages(form);
  });

  // Отправка формы

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      window.utils.renderSuccessMessage(form);
    }, window.utils.renderErrorMessage);
  });

})();
