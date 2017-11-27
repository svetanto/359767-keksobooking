'use strict';

var numberOfObjects = 8;
var locationMinX = 300;
var locationMaxX = 900;
var locationMinY = 100;
var locationMaxY = 500;
var minPrice = 1000;
var maxPrice = 1000000;
var minRooms = 1;
var maxRooms = 5;
var maxGuests = 100;

var AVATARS = generateAvatarsURLs('img/avatars/user0', '.png', numberOfObjects);
var TITLES_VALUES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TITLES = shuffleArray(TITLES_VALUES);
var LOCATIONS_X = generateLocations(locationMinX, locationMaxX, numberOfObjects);
var LOCATIONS_Y = generateLocations(locationMinY, locationMaxY, numberOfObjects);
var ADDRESSES = generateAddresses(numberOfObjects);
var PRICES = generatePrices(numberOfObjects);
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES_VALUES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var FEATURES = generateFeatures(numberOfObjects);

var objects = generateOfferedObjects(numberOfObjects);

var mapCardButtonTemplate = document.querySelector('template').content;
var mapButtonTemplate = mapCardButtonTemplate.querySelector('.map__pin');
var mapCardTemplate = mapCardButtonTemplate.querySelector('.map__card');
var pinsOverlay = document.querySelector('.map__pins');
var cardOverlay = document.querySelector('.map');

drawMapPins(pinsOverlay);
drawMapCard(cardOverlay, objects[0]);

function renderMapPin(pin) {
  var mapPin = mapButtonTemplate.cloneNode(true);
  var mapPinWidth = 40;
  var mapPinHeight = 44;
  mapPin.style = 'left: ' + (pin.location.x - mapPinWidth / 2) + 'px; top: ' + (pin.location.y - mapPinHeight) + 'px';
  mapPin.querySelector('img').src = pin.author.avatar;
  return mapPin;
}

function drawMapPins(pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(renderMapPin(objects[i]));
  }
  pins.appendChild(fragment);
}

function renderMapCard(data) {
  var mapCard = mapCardTemplate.cloneNode(true);
  mapCard.querySelector('h3').textContent = data.offer.title;
  mapCard.querySelector('small').textContent = data.offer.address;
  mapCard.querySelector('.popup__price').textContent = data.offer.price + ' ¥/ночь';
  // Линтер ругается на вложенный тернарный оператор - что - ифами что ли делать эту проверку??
  // Или какой-то вспомогательный массив создавать? Не понимаю - почему бы сразу в массив не записать правильные строки...
  mapCard.querySelector('h4').textContent = (data.offer.type === 'flat') ? 'Квартира' : (data.offer.type === 'house') ? 'Дом' : 'Бунгало';
  mapCard.querySelector('p:nth-of-type(3)').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

  var popupFeatures = mapCard.querySelector('.popup__features');
  var blocks = popupFeatures.querySelectorAll('li');
  for (var i = 0; i < popupFeatures.children.length; i++) {
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

function drawMapCard(card, data) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderMapCard(data));
  card.appendChild(fragment);
  card.insertBefore(fragment, card.querySelector('.map__filters-container'));
}

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

function generateAvatarsURLs(prefix, suffix, number) {
  var array = [];
  var avatarURLs = [];
  for (var i = 0; i < number; i++) {
    array.push(i + 1);
  }
  array = shuffleArray(array);
  for (i = 0; i < number; i++) {
    avatarURLs.push(prefix + array[i] + suffix);
  }
  return avatarURLs;
}

function generateLocations(min, max, number) {
  var array = [];
  for (var i = 0; i < number; i++) {
    array.push(generateRandomInteger(min, max));
  }
  return array;
}

function generateAddresses(number) {
  var array = [];
  for (var i = 0; i < number; i++) {
    array.push(LOCATIONS_X[i].toString() + ', ' + LOCATIONS_Y[i].toString());
  }
  return array;
}

function generatePrices(number) {
  var array = [];
  for (var i = 0; i < number; i++) {
    array.push(generateRandomInteger(minPrice, maxPrice));
  }
  return array;
}

function generateFeatures(number) {
  var array = [];
  for (var i = 0; i < number; i++) {
    var arrayTemp = [];
    var featuresNumber = generateRandomInteger(1, FEATURES_VALUES.length);
    var featuresValuesShuffled = shuffleArray(FEATURES_VALUES);
    for (var j = 0; j < featuresNumber; j++) {
      arrayTemp.push(featuresValuesShuffled[j]);
    }
    array[i] = arrayTemp;
  }
  return array;
}

function generateAuthorObject(number) {
  var object = {
    avatar: AVATARS[number]
  };
  return object;
}

function generateOfferObject(number) {
  var object = {
    title: TITLES[number],
    address: ADDRESSES[number],
    price: PRICES[number],
    type: TYPES[generateRandomInteger(0, TYPES.length - 1)],
    rooms: generateRandomInteger(minRooms, maxRooms),
    guests: generateRandomInteger(1, maxGuests),
    checkin: CHECKINS[generateRandomInteger(0, CHECKINS.length - 1)],
    checkout: CHECKOUTS[generateRandomInteger(0, CHECKOUTS.length - 1)],
    features: FEATURES[number],
    description: '',
    photos: []
  };
  return object;
}

function generateLocationObject(number) {
  var object = {
    x: LOCATIONS_X[number],
    y: LOCATIONS_Y[number]
  };
  return object;
}

function generateOfferedObjects(number) {
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
}
