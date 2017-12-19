'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  var MAIN_PIN_SIZE = {
    width: 62,
    height: 84
  };

  var BOUNDS = {
    minX: map.offsetLeft + MAIN_PIN_SIZE.width / 2,
    maxX: map.offsetLeft + map.clientWidth - MAIN_PIN_SIZE.width / 2,
    minY: 150 - MAIN_PIN_SIZE.height,
    maxY: 600 - MAIN_PIN_SIZE.height - window.scrollY
  };

  mapPinMain.addEventListener('mousedown', mapActivationHandler);

  function mapActivationHandler(downEvent) {
    downEvent.preventDefault();
    map.classList.remove('map--faded');

    window.backend.load(dataLoad, window.renderErrorMessage);

    function dataLoad(input) {
      window.drawMapPins(input);
    }

    mapPinMain.removeEventListener('mousedown', mapActivationHandler);
    mainPinActivationHandler(downEvent);
  }

  function mainPinActivationHandler(downEvt) {
    downEvt.preventDefault();
    mapPinMain.addEventListener('mousedown', mainPinActivationHandler);
    document.addEventListener('mousemove', mouseMoveHandler);

    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    var coordX;
    var coordY;

    function mouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();

      document.addEventListener('mouseup', mouseUpHandler);

      coordX = moveEvt.clientX;
      coordY = moveEvt.clientY;

      if (coordX < BOUNDS.minX) {
        coordX = BOUNDS.minX;
      }

      if (coordX > BOUNDS.maxX) {
        coordX = BOUNDS.maxX;
      }

      if (coordY < BOUNDS.minY) {
        coordY = BOUNDS.minY;
      }

      if (coordY > BOUNDS.maxY) {
        coordY = BOUNDS.maxY;
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
      document.removeEventListener('mouseup', mouseUpHandler);

      var noticeForm = document.querySelector('.notice__form');
      var fieldsets = noticeForm.querySelectorAll('fieldset');


      noticeForm.classList.remove('notice__form--disabled');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].removeAttribute('disabled');
      }
      var addressInput = noticeForm.querySelector('#address');
      addressInput.value = 'x: ' + (coordX + MAIN_PIN_SIZE.width / 2 - map.offsetLeft) + ', y: ' + (coordY + MAIN_PIN_SIZE.height);
    }
  }
  /*
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
  */

})();
