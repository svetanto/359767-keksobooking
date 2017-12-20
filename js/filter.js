'use strict';

(function () {

  window.filterObjects = function (objects) {

    var PIN_LIMIT = 5;

    window.drawMapPins(objects.slice(0, PIN_LIMIT));

    var mapFilters = document.querySelector('.map__filters');
    var housingType = mapFilters.querySelector('#housing-type');
    var housingPrice = mapFilters.querySelector('#housing-price');
    var housingRooms = mapFilters.querySelector('#housing-rooms');
    var housingGuests = mapFilters.querySelector('#housing-guests');
    var housingFeatures = mapFilters.querySelector('#housing-features');

    var HousingPriceMap = {
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

    mapFilters.addEventListener('change', choosePins);

    function choosePins() {
      var featureInputsSelected = housingFeatures.querySelectorAll('input:checked');
      var featuresSelected = [];
      if (featureInputsSelected) {
        for (var i = 0; i < featureInputsSelected.length; i++) {
          featuresSelected.push(featureInputsSelected[i].value);
        }
      }
      var filteredObjects = objects.filter(function (element) {

        return ((element.offer.type === housingType.value) || (housingType.value === 'any')) &&
        ((HousingPriceMap[housingPrice.value].min <= element.offer.price) && (element.offer.price <= HousingPriceMap[housingPrice.value].max)) &&
        ((element.offer.rooms.toString() === housingRooms.value) || (housingRooms.value === 'any')) &&
        ((element.offer.guests.toString() === housingGuests.value) || (housingGuests.value === 'any')) &&
        checkFeatures(element.offer.features);
      });

      function checkFeatures(elementFeatures) {
        if (!featureInputsSelected) {
          return true;
        }
        var allFeaturesIncluded = true;
        for (var j = 0; j < featuresSelected.length; j++) {
          allFeaturesIncluded = allFeaturesIncluded && elementFeatures.includes(featuresSelected[j]);
        }
        return allFeaturesIncluded;
      }

      window.debounce(function () {
        window.drawMapPins(filteredObjects.slice(0, PIN_LIMIT));
      });

    }

  };

})();
