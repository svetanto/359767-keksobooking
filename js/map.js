'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mouseup', pinActivationHandler);
  mapPinMain.addEventListener('keydown', pinPressEnterHandler);

  function pinPressEnterHandler(evt) {
    window.isEnterPressed(evt, pinActivationHandler);
  }

  function pinActivationHandler() {
    mapPinMain.removeEventListener('mouseup', pinActivationHandler);
    mapPinMain.removeEventListener('keydown', pinPressEnterHandler);
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
