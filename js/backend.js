'use strict';

(function () {

  var URL = 'https://1510.dump.academy/keksobooking';

  window.backend = {
    'save': function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.addEventListener('error', function () {
        onError(xhr.response);
      });

      xhr.open('POST', URL);
      xhr.send(data);
    },
    'load': function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {

        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 10000; // 10s

      xhr.open('GET', URL + '/data');
      xhr.send();
    }
  };
})();
