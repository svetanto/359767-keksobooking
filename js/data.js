'use strict';

(function () {

  window.generateInput = function (numberOfInputs) {

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

    var locationsX = window.generateRandomArray(LOCATION_MIN_X, LOCATION_MAX_X, numberOfInputs);
    var locationsY = window.generateRandomArray(LOCATION_MIN_Y, LOCATION_MAX_Y, numberOfInputs);

    return {
      avatars: generateAvatarsURLs(AVATAR_URL_PREFIX, AVATAR_URL_SUFFIX, numberOfInputs),
      titles: window.shuffleArray(TITLES),
      addresses: generateAddresses(locationsX, locationsY),
      prices: window.generateRandomArray(MIN_PRICE, MAX_PRICE, numberOfInputs),
      types: generateTypes(TYPES, numberOfInputs),
      rooms: window.generateRandomArray(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER, numberOfInputs),
      guests: window.generateRandomArray(1, MAX_GUESTS, numberOfInputs),
      checkins: window.generateRandomArrayfromInput(CHECKINS, numberOfInputs),
      checkouts: window.generateRandomArrayfromInput(CHECKOUTS, numberOfInputs),
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
      return window.shuffleArray(array);
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
        array.push(convertTypeToRussian(estateTypes[window.generateRandomInteger(0, estateTypes.length - 1)]));
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
        var featuresCount = window.generateRandomInteger(1, arr.length);
        var shuffledArr = window.shuffleArray(arr);
        for (var j = 0; j < featuresCount; j++) {
          featuresSet.push(shuffledArr[j]);
        }
        return featuresSet;
      }
    }
  };

})();
