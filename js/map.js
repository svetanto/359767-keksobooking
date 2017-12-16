'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
/*
  mapPinMain.addEventListener('keydown', pinPressEnterHandler);

  function pinPressEnterHandler(evt) {
    window.isEnterPressed(evt, pinActivationHandler);
  }
*/
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var coordX;
    var coordY;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      coordX = moveEvt.clientX;
      coordY = moveEvt.clientY;

      if (coordY < 100) {
        coordY = 100;
      }

      if (coordY > 500) {
        coordY = 500;
      }

      console.log(coordX);
      console.log(coordY);
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

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      pinActivationHandler();
    }

    function pinActivationHandler() {
      mapPinMain.removeEventListener('mouseup', onMouseUp);
      // mapPinMain.removeEventListener('keydown', pinPressEnterHandler);
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
      var addressInput = noticeForm.querySelectorAll('#address');
      addressInput.value = 'x: ' + coordX + ', y: ' + coordY;
      console.log(addressInput);
      console.log(addressInput.value);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


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
