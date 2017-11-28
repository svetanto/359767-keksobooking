'use strict';

var numberOfObjects = 8;

var inputObject = generateInput(numberOfObjects);
var arrayOfOfferedObjects = generateOfferedObjects(inputObject, numberOfObjects);
drawMapPins(arrayOfOfferedObjects);
drawMapCard(arrayOfOfferedObjects[0]);

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

  var avatars = generateAvatarsURLs(AVATAR_URL_PREFIX, AVATAR_URL_SUFFIX, numberOfInputs);
  var titles = shuffleArray(TITLES);
  var locationsX = generateRandomArray(LOCATION_MIN_X, LOCATION_MAX_X, numberOfInputs);
  var locationsY = generateRandomArray(LOCATION_MIN_Y, LOCATION_MAX_Y, numberOfInputs);
  var addresses = generateAddresses();
  var prices = generateRandomArray(MIN_PRICE, MAX_PRICE, numberOfInputs);
  var types = generateTypes(TYPES, numberOfInputs);
  var rooms = generateRandomArray(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER, numberOfInputs);
  var guests = generateRandomArray(1, MAX_GUESTS, numberOfInputs);
  var checkins = generateRandomArrayfromInput(CHECKINS, numberOfInputs);
  var checkouts = generateRandomArrayfromInput(CHECKOUTS, numberOfInputs);
  var features = generateFeatures(FEATURES, numberOfInputs);
  var descriptions = '';
  var photos = [];

  return {
    avatars: avatars,
    titles: titles,
    addresses: addresses,
    prices: prices,
    types: types,
    rooms: rooms,
    guests: guests,
    checkins: checkins,
    checkouts: checkouts,
    features: features,
    descriptions: descriptions,
    photos: photos,
    x: locationsX,
    y: locationsY
  };

  // Специфичные функции формирования входных данных ===========================
  function generateAvatarsURLs(prefix, suffix, number) {
    var array = [];
    var avatarURLs = [];
    for (var i = 1; i <= number; i++) {
      array.push((i < 10) ? '0' + i : i);
    }
    array = shuffleArray(array);
    for (i = 0; i < number; i++) {
      avatarURLs.push(prefix + array[i] + suffix);
    }
    return avatarURLs;
  }

  function generateAddresses() {
    var array = [];
    for (var i = 0; i < locationsX.length; i++) {
      array.push(locationsX[i] + ', ' + locationsY[i]);
    }
    return array;
  }

  function generateTypes(estateTypes, number) {
    var array = [];
    var type;
    for (var i = 0; i < number; i++) {
      switch (estateTypes[generateRandomInteger(0, estateTypes.length - 1)]) {
        case 'flat': type = 'Квартира';
          break;
        case 'house': type = 'Дом';
          break;
        case 'bungalo': type = 'Бунгало';
          break;
      }
      array.push(type);
    }
    return array;
  }

  function generateFeatures(input, number) {
    var array = [];
    for (var i = 0; i < number; i++) {
      var arrayTemp = [];
      var featuresNumber = generateRandomInteger(1, input.length);
      var featuresValuesShuffled = shuffleArray(input);
      for (var j = 0; j < featuresNumber; j++) {
        arrayTemp.push(featuresValuesShuffled[j]);
      }
      array[i] = arrayTemp;
    }
    return array;
  }
}

// Функция формирования массива из входных данных
function generateOfferedObjects(input, number) {
  var array = [];
  for (var i = 0; i < number; i++) {
    array[i] =
        {
          author: generateAuthorObject(i),
          offer: generateOfferObject(i),
          location: generateLocationObject(i)
        };
  }
  return array;

  function generateAuthorObject(num) {
    var object = {
      avatar: input.avatars[num]
    };
    return object;
  }

  function generateOfferObject(num) {
    var object = {
      title: input.titles[num],
      address: input.addresses[num],
      price: input.prices[num],
      type: input.types[num],
      rooms: input.rooms[num],
      guests: input.guests[num],
      checkin: input.checkins[num],
      checkout: input.checkouts[num],
      features: input.features[num],
      description: input.descriptions,
      photos: input.photos
    };
    return object;
  }

  function generateLocationObject(num) {
    var object = {
      x: input.x[num],
      y: input.y[num]
    };
    return object;
  }
}

// Функция отрисовки меток на карте
function drawMapPins(objects) {
  var mapCardPinTemplate = document.querySelector('template').content;
  var mapPinTemplate = mapCardPinTemplate.querySelector('.map__pin');
  var pinsOverlay = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(renderMapPin(objects[i]));
  }
  pinsOverlay.appendChild(fragment);

  function renderMapPin(pin) {
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinWidth = 40;
    var mapPinHeight = 44;
    mapPin.style = 'left: ' + (pin.location.x - mapPinWidth / 2) + 'px; top: ' + (pin.location.y - mapPinHeight) + 'px';
    mapPin.querySelector('img').src = pin.author.avatar;
    return mapPin;
  }
}

// Функция отрисовки карточки объекта
function drawMapCard(objects) {
  var mapCardPinTemplate = document.querySelector('template').content;
  var mapCardTemplate = mapCardPinTemplate.querySelector('.map__card');
  var cardOverlay = document.querySelector('.map');
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderMapCard(objects));
  cardOverlay.appendChild(fragment);
  cardOverlay.insertBefore(fragment, cardOverlay.querySelector('.map__filters-container'));

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
