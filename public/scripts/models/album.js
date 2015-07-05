window.Album = (function() {

  function Album(title, photos) {
    this.title = title;
    this.photos = photos;
  }

  Album.prototype = {
    add: function(photos) {
      this.photos = this.photos.concat(photos);
    },
    preload: function(size, callback) {
      var remaining = this.photos.length;

      // Preload each photo and invoke the callback when finished
      this.photos.forEach(function(photo) {
        photo.preload(size, function() {
          if (--remaining === 0) {
            callback();
          }
        });
      });
    },
    prev: function(photo) {
      var index = this.photos.indexOf(photo);

      if (index > 0) {
        return this.photos[index - 1];
      }
    },
    next: function(photo) {
      var index = this.photos.indexOf(photo);

      if (index < this.photos.length - 1) {
        return this.photos[index + 1];
      }
    }
  };

  return Album;

})();
