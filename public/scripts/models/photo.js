window.Photo = (function() {

  function Photo(id, sizes) {
    this.id = id;
    this.sizes = sizes;
  }

  Photo.prototype = {
    preload: function(size, callback) {
      if (!this.sizes.hasOwnProperty(size)) {
        throw new Error("Unrecognized size: " + size);
      }

      var img = new Image();
      img.onload = callback;
      img.src = this.sizes[size];
    }
  };

  return Photo;

})();
