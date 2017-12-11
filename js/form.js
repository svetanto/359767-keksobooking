'use strict';

(function () {

  // Синхронизация полей «время заезда» и «время выезда»
  var checkinInput = document.querySelector('#timein');
  var checkoutInput = document.querySelector('#timeout');

  checkinInput.addEventListener('input', function () {
    checkoutInput.value = checkinInput.value;
  });

  // Синхронизация поля «Тип жилья» с минимальной ценой в поле «Цена за ночь, руб.»
  var typeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  priceInput.min = 1000;

  typeInput.addEventListener('input', function () {
    switch (typeInput.value) {
      case 'bungalo':
        priceInput.min = 0;
        break;
      case 'flat':
        priceInput.min = 1000;
        break;
      case 'house':
        priceInput.min = 5000;
        break;
      default:
        priceInput.min = 10000;
    }
    // console.log(priceInput.min);
  });

  // Синхронизация поля «Кол-во комнат» с полем «Количество мест»
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  roomNumber.addEventListener('input', function () {
    capacity.value = (roomNumber.value <= 3) ? roomNumber.value : 0;
  });

  // Подсветка невалидных полей
  var watchedInputs = [
    document.querySelector('#title'),
    document.querySelector('#address')
  ];

  for (var i = 0; i < watchedInputs.length; i++) {
    watchedInputs[i].addEventListener('invalid', function () {
      this.style = 'border: 2px solid red';
    });
    watchedInputs[i].addEventListener('blur', function () {
      this.style = 'border: 1px solid #eee';
    });
  }

})();
