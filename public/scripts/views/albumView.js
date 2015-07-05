window.AlbumView = (function() {

  function AlbumView(el, params) {
    this.onClick = params.onClick || function() {};
    this._dom = {
      thumbs: el.querySelector(".thumbnails")
    };
  }

  AlbumView.prototype = {
    load: function(album) {
      this._clear();
      var thumbnails = this._createThumbnails(album.photos);
      this._renderThumbnails(thumbnails);
    },
    _clear: function() {
      while (this._dom.thumbs.firstChild) {
        this._dom.thumbs.removeChild(this._dom.thumbs.firstChild);
      }
    },
    _createThumbnail: function(photo) {
      var thumb = document.createElement("img");
      thumb.className = "thumbnail fadeIn";
      thumb.src = photo.small;
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
