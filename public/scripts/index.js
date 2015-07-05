(function(AlbumView, IndexView, InstagramService, LightboxView) {

  window.onload = function() {
    var lightboxContainer = document.querySelector(".lightbox-container");
    var lightboxView = new LightboxView(lightboxContainer);

    var albumContainer = document.querySelector(".photos-container");
    var albumView = new AlbumView(albumContainer, {
      onClick: function(photo) {
        lightboxView.load(photo);
      }
    });

    var indexContainer = document.querySelector(".container");
    var indexView = new IndexView(indexContainer, {
      onLoad: function(album) {
        lightboxView.setTraversalMethods({
          prev: album.prev.bind(album),
          next: album.next.bind(album)
        });
        albumView.load(album);
      },
      photoService: InstagramService
    });
    indexView.load();
  };

})(window.AlbumView, window.IndexView, window.InstagramService, window.LightboxView);
