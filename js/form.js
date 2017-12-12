'use strict';

(function () {

  // Синхронизация полей «время заезда» и «время выезда»
  var checkinInput = document.querySelector('#timein');
  var checkoutInput = document.querySelector('#timeout');

  checkinInput.addEventListener('input', syncCheckTimeHandler);
  checkoutInput.addEventListener('input', syncCheckTimeHandler);

  function syncCheckTimeHandler(evt) {
    var syncField = (evt.target.id === 'timein') ? checkoutInput : checkinInput;
    syncField.value = evt.target.value;
  }

  // Синхронизация поля «Тип жилья» с минимальной ценой в поле «Цена за ночь, руб.»
  var MIN_PRICE_CONFIG = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var typeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  priceInput.min = 1000;

  typeInput.addEventListener('input', setMinPrice);

  function setMinPrice() {
    priceInput.min = MIN_PRICE_CONFIG[typeInput.value];
    if (Number(priceInput.value) < Number(priceInput.min)) {
      priceInput.value = priceInput.min;
    }
  }

  // Синхронизация поля «Кол-во комнат» с полем «Количество мест»
  var ROOMS_SYNC_CAPACITY = {
    1: [false, true, false, false],
    2: [false, true, true, false],
    3: [false, true, true, true],
    100: [true, false, false, false]
  };
  var maxNumberOfGuests = 3;
  var guestsNumberOptions = [];
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  for (var i = maxNumberOfGuests; i >= 0; i--) {
    guestsNumberOptions.push(capacity.querySelector('option[value="' + (3 - i) + '"]'));
  }

  // console.log(guestsNumberOptions[j]);

  roomNumber.addEventListener('input', setGuestsNumberOptions);

  function setGuestsNumberOptions(evt) {
    for (var j = 0; j <= maxNumberOfGuests; j++) {
      guestsNumberOptions[j].disabled = ROOMS_SYNC_CAPACITY[evt.target.value][j] ? false : true;
    }
    capacity.value = (roomNumber.value === '100') ? 0 : roomNumber.value;
  }

  // Подсветка невалидных полей
  var watchedInputs = [
    document.querySelector('#title'),
    document.querySelector('#address'),
    document.querySelector('#price')
  ];

  for (i = 0; i < watchedInputs.length; i++) {
    watchedInputs[i].addEventListener('invalid', function (evt) {
      evt.target.style = 'border: 2px solid red';
    });
    watchedInputs[i].addEventListener('blur', function (evt) {
      evt.target.style = 'border: 1px solid #eee';
    });
  }

})();
