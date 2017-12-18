'use strict';

(function () {

  window.synchronizeFields = function (syncWhat, syncWith, syncFunc) {
    if (typeof syncFunc === 'function') {
      syncFunc(syncWhat, syncWith);
    }
  };

})();
