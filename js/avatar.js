'use strict';

(function () {

  // Загрузка файла выбором в диалоговом окне
  var fileChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.notice__preview img');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];

    if (window.checkIsFileImageType(file.name)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  // Загрузка файла перетаскиванием
  var avatarDropzone = document.querySelector('.notice__photo .drop-zone');
  avatarDropzone.addEventListener('dragenter', function () {
    avatarDropzone.style.background = 'lightgreen';
  });

  avatarDropzone.addEventListener('dragleave', function () {
    avatarDropzone.style.background = 'transparent';
  });

  avatarDropzone.addEventListener('dragover', handleDragOver, false);
  avatarDropzone.addEventListener('drop', handleFileSelect, false);

  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    avatarDropzone.style.background = 'transparent';
    fileChooser.files = evt.dataTransfer.files;
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

})();
