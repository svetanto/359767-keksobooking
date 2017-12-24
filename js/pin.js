'use strict';

(function () {

  window.drawMapPins = function (objects) {

    // Удаление старых пинов и карточки (if any)
    window.card.remove();

    var mapPins = document.querySelector('.map__pins');
    var oldMapPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (oldMapPins) {
      oldMapPins.forEach(function (item) {
        mapPins.removeChild(item);
      });
    }

    var mapTemplate = document.querySelector('template').content;
    var mapPinTemplate = mapTemplate.querySelector('.map__pin');
    window.previousPin = null;
    var fragment = document.createDocumentFragment();
    objects.forEach(function (item, index) {
      fragment.appendChild(renderMapPin(item, index));
    });

    mapPins.appendChild(fragment);

    function renderMapPin(object, index) {
      var mapPin = mapPinTemplate.cloneNode(true);
      var mapPinWidth = 40;
      var mapPinHeight = 44;
      mapPin.style = 'left: ' + (object.location.x - mapPinWidth / 2) + 'px; top: ' + (object.location.y - mapPinHeight) + 'px';
      mapPin.querySelector('img').src = object.author.avatar;
      mapPin.addEventListener('click', function () {
        pinClickHandler(mapPin, index);
      });

      function pinClickHandler(pin, pinNumber) {
        if (window.previousPin) {
          window.previousPin.classList.remove('map__pin--active');
        }
        window.previousPin = pin;
        pin.classList.add('map__pin--active');
        window.card.draw(objects[pinNumber], pin);
      }
      return mapPin;
    }
  };

})();
