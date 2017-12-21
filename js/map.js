'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var firstMove = true;

  var MAIN_PIN_SIZE = {
    width: 62,
    height: 84
  };

  var BOUNDS = {
    minX: map.offsetLeft + MAIN_PIN_SIZE.width / 2,
    maxX: map.offsetLeft + map.clientWidth - MAIN_PIN_SIZE.width / 2,
    minY: 200 - MAIN_PIN_SIZE.height - window.scrollY,
    maxY: 650 - MAIN_PIN_SIZE.height - window.scrollY
  };

  var coordX = mapPinMain.offsetLeft + map.offsetLeft;
  var coordY = mapPinMain.offsetTop - window.scrollY;

  window.addEventListener('scroll', function () {
    BOUNDS.minY = 200 - MAIN_PIN_SIZE.height - window.scrollY;
    BOUNDS.maxY = 650 - MAIN_PIN_SIZE.height - window.scrollY;
  });

  var PIN_LIMIT = 5;

  mapPinMain.addEventListener('mousedown', mapActivationHandler);

  function mapActivationHandler(downEvent) {
    downEvent.preventDefault();
    map.classList.remove('map--faded');

    mapPinMain.removeEventListener('mousedown', mapActivationHandler);
    mainPinActivationHandler(downEvent);
  }

  function mainPinActivationHandler(downEvt) {
    downEvt.preventDefault();
    mapPinMain.addEventListener('mousedown', mainPinActivationHandler);
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    function mouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();

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

      if (firstMove) {
        window.backend.load(dataLoad, window.renderErrorMessage);
        firstMove = false;
      }

      function dataLoad(input) {
        window.drawMapPins(input.slice(0, PIN_LIMIT));
        window.initFilter(input, PIN_LIMIT, window.drawMapPins);
      }

      var noticeForm = document.querySelector('.notice__form');
      var fieldsets = noticeForm.querySelectorAll('fieldset');

      noticeForm.classList.remove('notice__form--disabled');

      fieldsets.forEach(function (item) {
        item.removeAttribute('disabled');
      });

      var addressInput = noticeForm.querySelector('#address');

      if (!coordX || !coordY) {
        coordX = oldCoordX;
        coordY = oldCoordY;
      }
      addressInput.value = 'x: ' + (coordX + MAIN_PIN_SIZE.width / 2 - map.offsetLeft) + ', y: ' + (coordY + MAIN_PIN_SIZE.height + window.scrollY);

      var oldCoordX;
      var oldCoordY;
      oldCoordX = coordX;
      oldCoordY = coordY;
    }
  }

})();
