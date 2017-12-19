'use strict';

(function () {

  window.drawMapCard = function (object, pin) {

    var mapTemplate = document.querySelector('template').content;
    var mapCardTemplate = mapTemplate.querySelector('.map__card');
    var map = document.querySelector('.map');

    removeCard();
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderMapCard(object));
    map.insertBefore(fragment, map.querySelector('.map__filters-container'));

    var cardClose = document.querySelector('.popup__close');
    cardClose.addEventListener('click', function () {
      closeCard(pin);
    });

    window.addEventListener('keydown', cardPressEscHandler);

    function cardPressEscHandler(evt) {
      window.isEscPressed(evt, closeCard);
    }

    function closeCard() {
      removeCard();
      pin.classList.remove('map__pin--active');
      window.previousPin = null;
      window.removeEventListener('keydown', cardPressEscHandler);
    }

    function removeCard() {
      var card = map.querySelector('.map__card');
      if (card) {
        map.removeChild(card);
      }
    }

    function renderMapCard(data) {
      var mapCard = mapCardTemplate.cloneNode(true);
      mapCard.querySelector('h3').textContent = data.offer.title;
      mapCard.querySelector('small').textContent = data.offer.address;
      mapCard.querySelector('.popup__price').textContent = data.offer.price + ' ' + String.fromCharCode(0x20bd) + '/ночь';
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

      // Вставка в карточку фоток - непонятно надо это или нет??
      function renderPhotos() {
        var popupPictures = mapCard.querySelector('.popup__pictures');
        var listItemTemplate = popupPictures.querySelector('li');
        popupPictures.removeChild(listItemTemplate);
        var photosFragment = document.createDocumentFragment();
        for (var j = 0; j < data.offer.photos.length; j++) {
          var listItem = listItemTemplate.cloneNode(true);
          var image = listItem.querySelector('img');
          image.src = data.offer.photos[j];
          photosFragment.appendChild(listItem);
          // console.log(block);
        }
        popupPictures.appendChild(photosFragment);
      }

      renderPhotos();
      return mapCard;
    }
  };

})();
