'use strict';

(function () {

  // Загрузка файлов выбором в диалоговом окне
  var fileChooser = document.querySelector('#images');
  var photoContainer = document.querySelector('.form__photo-container');

  fileChooser.addEventListener('change', function () {
    var filesList = fileChooser.files;
    var imageFilesList = {};
    var j = 0;
    for (var i = 0; i < filesList.length; i++) {
      if (window.checkIsFileImageType(filesList[i].name)) {
        imageFilesList[j] = filesList[i];
        j++;
      }
    }
    if (imageFilesList) {
      Object.keys(imageFilesList).forEach(function (el) {
        readAndDisplayImage(imageFilesList[el]);
      });
    }
  });

  function readAndDisplayImage(imageFilesListItem) {
    var img = document.createElement('img');
    img.file = imageFilesListItem;
    photoContainer.appendChild(img);
    var reader = new FileReader();
    reader.addEventListener('load', function (e) {
      img.src = e.target.result;
    });
    reader.readAsDataURL(imageFilesListItem);
  }

  // Загрузка файлов перетаскиванием
  var housingPhotoDropzone = photoContainer.querySelector('.drop-zone');

  housingPhotoDropzone.addEventListener('dragenter', function () {
    housingPhotoDropzone.style.background = 'lightgreen';
  });

  housingPhotoDropzone.addEventListener('dragleave', function () {
    housingPhotoDropzone.style.background = 'transparent';
  });

  housingPhotoDropzone.addEventListener('dragover', handleDragOver, false);
  housingPhotoDropzone.addEventListener('drop', handleFileSelect, false);

  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    housingPhotoDropzone.style.background = 'transparent';
    var filesList = evt.dataTransfer.files;
    var imageFilesList = {};
    var j = 0;
    for (var i = 0; i < filesList.length; i++) {
      if (window.checkIsFileImageType(filesList[i].name)) {
        imageFilesList[j] = filesList[i];
        j++;
      }
    }
    if (imageFilesList) {
      Object.keys(imageFilesList).forEach(function (el) {
        readAndDisplayImage(imageFilesList[el]);
      });
    }
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

})();
