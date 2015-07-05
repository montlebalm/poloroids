window.IndexView = (function() {

  function IndexView(el, params) {
    this._photoService = params.photoService;
    this._onLoad = params.onLoad;
    this._dom = {
      refresh: el.querySelector(".refresh"),
      title: el.querySelector(".album-title"),
      loader: el.querySelector(".loader"),
      photosContainer: el.querySelector(".photos-container")
    };
    this._bindEvents();
  }

  IndexView.prototype = {
    hideLoading: function() {
      this._dom.loader.classList.add("hide");
      this._dom.photosContainer.classList.remove("hide");
    },
    load: function() {
      this.showLoading();
      this._photoService.query(this._loaded.bind(this));
    },
    showLoading: function() {
      this._dom.loader.classList.remove("hide");
      this._dom.photosContainer.classList.add("hide");
    },
    _bindEvents: function() {
      this._dom.refresh.addEventListener("click", this.load.bind(this));
    },
    _loaded: function(err, album) {
      this._setTitle(album.title);

      album.preload("small", function() {
        this._onLoad(album);
        this.hideLoading();
      }.bind(this));
    },
    _setTitle: function(title) {
      this._dom.title.textContent = title;
    }
  };

  return IndexView;

})();
