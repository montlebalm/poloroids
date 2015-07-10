window.AlbumView = (function() {

  function AlbumView(el, params) {
    this.onClick = params.onClick || function() {};
    this._dom = {
      responsives: el.querySelector(".thumbnails-full"),
      thumbs: el.querySelector(".thumbnails")
    };
  }

  AlbumView.prototype = {
    load: function(album) {
      var newPhotos = album.photos.filter(function(photo) {
        return !document.getElementById("img-" + photo.id);
      });

      // Render the thumbnails used on large viewports
      var thumbnails = newPhotos.map(this._createThumbnail.bind(this));
      this._renderInto(this._dom.thumbs, thumbnails);

      // Render the thumbnails used on large viewports
      var responsives = newPhotos.map(this._createResponsivePhoto.bind(this));
      this._renderInto(this._dom.responsives, responsives);
    },
    _createThumbnail: function(photo) {
      var thumb = document.createElement("img");
      thumb.id = "img-" + photo.id;
      thumb.className = "thumbnail fadeIn";
      thumb.src = photo.sizes.small;
      thumb.addEventListener("click", this.onClick.bind(null, photo));
      return thumb;
    },
    _createResponsivePhoto: function(photo) {
      var fullSize = document.createElement("div");
      fullSize.className = "photo";
      fullSize.style.backgroundImage = "url(" + photo.sizes.large + ")";
      return fullSize;
    },
    _createThumbnails: function(photos) {
      return photos.map(this._createThumbnail.bind(this));
    },
    _renderInto: function(container, els) {
      els.forEach(container.appendChild.bind(container));
    }
  };

  return AlbumView;

})();
