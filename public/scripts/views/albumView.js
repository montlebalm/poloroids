window.AlbumView = (function() {

  function AlbumView(el, params) {
    this.onClick = params.onClick || function() {};
    this._dom = {
      thumbs: el.querySelector(".thumbnails")
    };
  }

  AlbumView.prototype = {
    load: function(album) {
      var newPhotos = album.photos.filter(function(photo) {
        return !document.getElementById("img-" + photo.id);
      });
      var thumbnails = this._createThumbnails(newPhotos);
      this._renderThumbnails(thumbnails);
    },
    _createThumbnail: function(photo) {
      var thumb = document.createElement("img");
      thumb.id = "img-" + photo.id;
      thumb.className = "thumbnail fadeIn";
      thumb.src = photo.sizes.small;
      thumb.addEventListener("click", this.onClick.bind(null, photo));
      return thumb;
    },
    _createThumbnails: function(photos) {
      return photos.map(this._createThumbnail.bind(this));
    },
    _renderThumbnails: function(thumbs) {
      thumbs.forEach(function(thumb) {
        this._dom.thumbs.appendChild(thumb);
      }.bind(this));
    }
  };

  return AlbumView;

})();
