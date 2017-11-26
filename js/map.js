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


// for (i = 0; i < 8; i++) {
  console.log(objects);
// }

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
  var stringTemp = '';
  var arrayTemp = [];
  var array = [];
  for (var i = 0; i < number; i++) {
    stringTemp = '';
    var featuresNumber = generateRandomInteger(1, FEATURES_VALUES.length);
    arrayTemp = shuffleArray(FEATURES_VALUES);
    for (var j = 0; j < featuresNumber; j++) {
      stringTemp += (arrayTemp[j] + ' ');
    }
    array[i] = stringTemp;
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
