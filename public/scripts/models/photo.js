window.Photo = (function() {

  function Photo(id, params) {
    this.id = id;
    this.author = params.author;
    this.createdDate = params.createdDate;
    this.sizes = params.sizes;
    this.title = params.title;
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
