'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var mapPinMain = document.querySelector('.map__pin--main');
  var previousPinNumber = -1;

  mapPinMain.addEventListener('mouseup', pinActivationHandler);
  mapPinMain.addEventListener('keydown', pinPressEnterHandler);

  function pinPressEnterHandler(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      pinActivationHandler();
    }
  }

  function pinActivationHandler() {
    mapPinMain.removeEventListener('mouseup', pinActivationHandler);
    mapPinMain.removeEventListener('keydown', pinPressEnterHandler);
    var map = document.querySelector('.map');
    var noticeForm = document.querySelector('.notice__form');
    var fieldsets = noticeForm.querySelectorAll('fieldset');

    map.classList.remove('map--faded');
    var numberOfObjects = 8;
    var inputObject = generateInput(numberOfObjects);
    drawMapPins(generateOfferedObjects(inputObject, numberOfObjects));
    noticeForm.classList.remove('notice__form--disabled');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
  }


  // Функция формирования входных данных (эмуляция внешнего ввода, потом будет заменена на внешний ввод)
  function generateInput(numberOfInputs) {

    var AVATAR_URL_PREFIX = 'img/avatars/user';
    var AVATAR_URL_SUFFIX = '.png';
    var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
    var LOCATION_MIN_X = 300;
    var LOCATION_MAX_X = 900;
    var LOCATION_MIN_Y = 100;
    var LOCATION_MAX_Y = 500;
    var MIN_PRICE = 1000;
    var MAX_PRICE = 1000000;
    var TYPES = ['flat', 'house', 'bungalo'];
    var MIN_ROOMS_NUMBER = 1;
    var MAX_ROOMS_NUMBER = 5;
    var MAX_GUESTS = 100;
    var CHECKINS = ['12:00', '13:00', '14:00'];
    var CHECKOUTS = ['12:00', '13:00', '14:00'];
    var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    var locationsX = generateRandomArray(LOCATION_MIN_X, LOCATION_MAX_X, numberOfInputs);
    var locationsY = generateRandomArray(LOCATION_MIN_Y, LOCATION_MAX_Y, numberOfInputs);

    return {
      avatars: generateAvatarsURLs(AVATAR_URL_PREFIX, AVATAR_URL_SUFFIX, numberOfInputs),
      titles: shuffleArray(TITLES),
      addresses: generateAddresses(locationsX, locationsY),
      prices: generateRandomArray(MIN_PRICE, MAX_PRICE, numberOfInputs),
      types: generateTypes(TYPES, numberOfInputs),
      rooms: generateRandomArray(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER, numberOfInputs),
      guests: generateRandomArray(1, MAX_GUESTS, numberOfInputs),
      checkins: generateRandomArrayfromInput(CHECKINS, numberOfInputs),
      checkouts: generateRandomArrayfromInput(CHECKOUTS, numberOfInputs),
      features: generateFeatures(FEATURES, numberOfInputs),
      descriptions: '',
      photos: [],
      x: locationsX,
      y: locationsY
    };

    // Специфичные функции формирования входных данных ===========================
    function generateAvatarsURLs(prefix, suffix, number) {
      var array = [];
      for (var i = 1; i <= number; i++) {
        array.push(prefix + ((i < 10) ? '0' + i : i) + suffix);
      }
      return shuffleArray(array);
    }

    function generateAddresses(x, y) {
      var array = [];
      for (var i = 0; i < x.length; i++) {
        array.push(x[i] + ', ' + y[i]);
      }
      return array;
    }

    function generateTypes(estateTypes, number) {
      var array = [];
      for (var i = 0; i < number; i++) {
        array.push(convertTypeToRussian(estateTypes[generateRandomInteger(0, estateTypes.length - 1)]));
      }
      return array;
      function convertTypeToRussian(type) {
        switch (type) {
          case 'flat':
            return 'Квартира';
          case 'house':
            return 'Дом';
          default:
            return 'Бунгало';
        }
      }
    }

    function generateFeatures(arrayOfPossibleFeatures, number) {
      var features = [];
      for (var i = 0; i < number; i++) {
        features.push(generateFeaturesSet(arrayOfPossibleFeatures));
      }
      return features;

      function generateFeaturesSet(arr) {
        var featuresSet = [];
        var featuresCount = generateRandomInteger(1, arr.length);
        var shuffledArr = shuffleArray(arr);
        for (var j = 0; j < featuresCount; j++) {
          featuresSet.push(shuffledArr[j]);
        }
        return featuresSet;
      }
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

  // Функция отрисовки меток на карте
  function drawMapPins(objects) {
    var mapCardPinTemplate = document.querySelector('template').content;
    var mapPinTemplate = mapCardPinTemplate.querySelector('.map__pin');
    var pinsOverlay = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < objects.length; i++) {
      fragment.appendChild(renderMapPin(objects[i], i));
    }
    pinsOverlay.appendChild(fragment);

    function renderMapPin(pin, index) {
      var mapPin = mapPinTemplate.cloneNode(true);
      var mapPinWidth = 40;
      var mapPinHeight = 44;
      mapPin.style = 'left: ' + (pin.location.x - mapPinWidth / 2) + 'px; top: ' + (pin.location.y - mapPinHeight) + 'px';
      mapPin.querySelector('img').src = pin.author.avatar;
      mapPin.addEventListener('click', function () {
        pinClickHandler(index);
      });

      function pinClickHandler(pinNumber) {
        var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
        if (previousPinNumber !== -1) {
          mapPins[previousPinNumber].classList.remove('map__pin--active');
        }
        previousPinNumber = pinNumber;
        mapPins[pinNumber].classList.add('map__pin--active');
        removeMapCard();
        drawMapCard(objects[pinNumber], mapPins[pinNumber]);
      }
      return mapPin;
    }
  }


  // Функция отрисовки карточки объекта
  function drawMapCard(objects, pin) {
    var mapCardPinTemplate = document.querySelector('template').content;
    var mapCardTemplate = mapCardPinTemplate.querySelector('.map__card');
    var cardOverlay = document.querySelector('.map');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderMapCard(objects));
    cardOverlay.insertBefore(fragment, cardOverlay.querySelector('.map__filters-container'));

    var cardClose = document.querySelector('.popup__close');
    cardClose.addEventListener('click', function () {
      closeCard(pin);
    });

    window.addEventListener('keydown', cardPressEscHandler);

    function cardPressEscHandler(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeCard(pin);
      }
    }

    function closeCard(currentPin) {
      removeMapCard();
      currentPin.classList.remove('map__pin--active');
      previousPinNumber = -1;
      window.removeEventListener('keydown', cardPressEscHandler);
    }

    function renderMapCard(data) {
      var mapCard = mapCardTemplate.cloneNode(true);
      mapCard.querySelector('h3').textContent = data.offer.title;
      mapCard.querySelector('small').textContent = data.offer.address;
      mapCard.querySelector('.popup__price').textContent = data.offer.price + ' ₽/ночь';
      mapCard.querySelector('h4').textContent = data.offer.type;
      mapCard.querySelector('p:nth-of-type(3)').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
      mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

      var popupFeatures = mapCard.querySelector('.popup__features');
      var blocks = popupFeatures.querySelectorAll('li');
      for (var i = 0; i < blocks.length; i++) {
        if (data.offer.features[i]) {
          blocks[i].classList = 'feature feature--' + data.offer.features[i];
        } else {
          popupFeatures.removeChild(blocks[i]);
        }
      }

      mapCard.querySelector('p:nth-of-type(5)').textContent = data.offer.description;
      mapCard.querySelector('.popup__avatar').src = data.author.avatar;
      return mapCard;
    }
  }

  function removeMapCard() {
    var cardOverlay = document.querySelector('.map');
    var card = cardOverlay.querySelector('.map__card');
    if (card) {
      cardOverlay.removeChild(card);
    }
  }

  // Утилитарные функции =========================================================

  function shuffleArray(array) {
    for (var i = array.length - 1; i; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var swap = array[i];
      array[i] = array[j];
      array[j] = swap;
    }
    return array;
  }

  function generateRandomInteger(fromNumber, toNumber) {
    return Math.round(Math.random() * (toNumber - fromNumber) + fromNumber);
  }

  function generateRandomArray(min, max, number) {
    var array = [];
    for (var i = 0; i < number; i++) {
      array.push(generateRandomInteger(min, max));
    }
    return array;
  }

  function generateRandomArrayfromInput(input, number) {
    var array = [];
    for (var i = 0; i < number; i++) {
      array.push(input[generateRandomInteger(0, input.length - 1)]);
    }
    return array;
  }
})();
