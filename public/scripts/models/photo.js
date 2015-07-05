window.Photo = (function() {

  function Photo(small, large) {
    this.small = small;
    this.large = large;
  }

  Photo.prototype = {
    preload: function(size, callback) {
      var img = new Image();
      img.onload = callback;
      img.src = this[size || "small"];
    }
  };

  return Photo;

})();
