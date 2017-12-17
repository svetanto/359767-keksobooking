'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  var MAIN_PIN = {
    width: 62,
    height: 84
  };

  var COORD_Y = {
    min: 100 - MAIN_PIN.height,
    max: 500 - MAIN_PIN.height
  };

  mapPinMain.addEventListener('mousedown', mainPinActivationHandler);

  function mainPinActivationHandler(downEvt) {
    downEvt.preventDefault();
    mapPinMain.removeEventListener('mousedown', mainPinActivationHandler);
    document.addEventListener('mousemove', mouseMoveHandler);

    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    var coordX;
    var coordY;

    function mouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();

      mapPinMain.addEventListener('mouseup', mouseUpHandler);

      coordX = moveEvt.clientX;
      coordY = moveEvt.clientY;

      if (coordY < COORD_Y.min) {
        coordY = COORD_Y.min;
      }

      if (coordY > COORD_Y.max) {
        coordY = COORD_Y.max;
      }

      var shift = {
        x: startCoords.x - coordX,
        y: startCoords.y - coordY
      };

      startCoords = {
        x: coordX,
        y: coordY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    }

    function mouseUpHandler(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      mapPinMain.removeEventListener('mouseup', mouseUpHandler);

      var noticeForm = document.querySelector('.notice__form');
      var fieldsets = noticeForm.querySelectorAll('fieldset');

      map.classList.remove('map--faded');
      var numberOfObjects = 8;
      var inputObject = window.generateInput(numberOfObjects);
      window.drawMapPins(generateOfferedObjects(inputObject, numberOfObjects));
      noticeForm.classList.remove('notice__form--disabled');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].removeAttribute('disabled');
      }
      var addressInput = noticeForm.querySelector('#address');
      addressInput.value = 'x: ' + (coordX + MAIN_PIN.width / 2) + ', y: ' + (coordY + MAIN_PIN.height);
    }
  }

  // Функция формирования массива из входных данных
  function generateOfferedObjects(input, number) {
    var array = [];
    for (var i = 0; i < number; i++) {
      array[i] =
          {
            author: generateAuthorObject(input, i),
            offer: generateOfferObject(input, i),
            location: generateLocationObject(input, i)
          };
    }
    return array;

    function generateAuthorObject(inp, num) {
      return {
        avatar: inp.avatars[num]
      };
    }

    function generateOfferObject(inp, num) {
      return {
        title: inp.titles[num],
        address: inp.addresses[num],
        price: inp.prices[num],
        type: inp.types[num],
        rooms: inp.rooms[num],
        guests: inp.guests[num],
        checkin: inp.checkins[num],
        checkout: inp.checkouts[num],
        features: inp.features[num],
        description: inp.descriptions,
        photos: inp.photos
      };
    }

    function generateLocationObject(inp, num) {
      return {
        x: inp.x[num],
        y: inp.y[num]
      };
    }
  }

})();
