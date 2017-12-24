'use strict';

(function () {

  var HOUSING_PRICE_MAP = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: 1000000
    },
    any: {
      min: 0,
      max: 1000000
    }
  };

  window.initFilter = function (objects, limit, callback) {

    var mapFilters = document.querySelector('.map__filters');

    mapFilters.addEventListener('change', function () {
      window.utils.debounce(function () {
        callback(getFilteredObjects());
      });
    });

    function getFilteredObjects() {
      var housingType = mapFilters.querySelector('#housing-type');
      var housingPrice = mapFilters.querySelector('#housing-price');
      var housingRooms = mapFilters.querySelector('#housing-rooms');
      var housingGuests = mapFilters.querySelector('#housing-guests');
      var housingFeatures = mapFilters.querySelector('#housing-features');

      var featureInputsSelected = housingFeatures.querySelectorAll('input:checked');
      var featuresSelected = [].map.call(featureInputsSelected, function (el) {
        return el.value;
      });

      var filteredObjects = objects.filter(function (element) {
        return ((element.offer.type === housingType.value) || (housingType.value === 'any')) &&
        ((HOUSING_PRICE_MAP[housingPrice.value].min <= element.offer.price) && (element.offer.price <= HOUSING_PRICE_MAP[housingPrice.value].max)) &&
        ((element.offer.rooms.toString() === housingRooms.value) || (housingRooms.value === 'any')) &&
        ((element.offer.guests.toString() === housingGuests.value) || (housingGuests.value === 'any')) &&
        checkFeatures(element.offer.features);
      });

      function checkFeatures(elementFeatures) {
        if (!featureInputsSelected) {
          return true;
        }
        var allFeaturesIncluded = true;
        featuresSelected.forEach(function (item) {
          allFeaturesIncluded = allFeaturesIncluded && elementFeatures.includes(item);
        });
        return allFeaturesIncluded;
      }
      return filteredObjects.slice(0, limit);
    }

  };

})();
