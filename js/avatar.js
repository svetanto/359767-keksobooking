'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];

  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.notice__preview img');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var avatarDropzone = document.querySelector('.notice__photo .drop-zone');
  // console.log(avatarDropzone);
  avatarDropzone.addEventListener('dragenter', function () {
    avatarDropzone.style.background = 'lightgreen';
  });

  avatarDropzone.addEventListener('dragleave', function () {
    avatarDropzone.style.background = 'transparent';
  });

  avatarDropzone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    avatarDropzone.style.background = 'red';
    console.log('drop');
  });

})();
