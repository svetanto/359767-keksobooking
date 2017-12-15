'use strict';

(function () {

  window.drawMapPins = function (objects) {

    var mapTemplate = document.querySelector('template').content;
    var mapPinTemplate = mapTemplate.querySelector('.map__pin');
    window.previousPin = null;
    var pinsOverlay = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < objects.length; i++) {
      fragment.appendChild(renderMapPin(objects[i], i));
    }
    pinsOverlay.appendChild(fragment);

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
        window.drawMapCard(objects[pinNumber], pin);
      }
      return mapPin;
    }
  };

})();
