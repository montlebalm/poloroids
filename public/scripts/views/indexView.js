window.IndexView = (function() {

  function IndexView(el, params) {
    this._photoService = params.photoService;
    this._onLoad = params.onLoad;
    this._dom = {
      loader: el.querySelector(".loader"),
      loadMore: el.querySelector(".load-more"),
      photosContainer: el.querySelector(".photos-container"),
      title: el.querySelector(".album-title")
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
    loadMore: function() {
      this._photoService.query(this._loadedMore.bind(this));
    },
    showLoading: function() {
      this._dom.loader.classList.remove("hide");
      this._dom.photosContainer.classList.add("hide");
    },
    _bindEvents: function() {
      this._dom.loadMore.addEventListener("click", function(e) {
        e.preventDefault();
        e.currentTarget.setAttribute("disabled", "disabled");
        this.loadMore();
      }.bind(this));
    },
    _handleError: function(err) {
      var msg = 'Look what you\'ve done.\nError: "' + err + '"';
      alert(msg);
    },
    _loaded: function(err, album) {
      if (err) { return this._handleError(err); }

      this.album = album;
      this._setTitle(album.title);

      album.preload("small", function() {
        this._onLoad(this.album);
        this.hideLoading();
      }.bind(this));
    },
    _loadedMore: function(err, album) {
      if (err) { return this._handleError(err); }

      this.album.add(album.photos);

      album.preload("small", function() {
        this._onLoad(this.album);
        this._dom.loadMore.removeAttribute("disabled");
      }.bind(this));
    },
    _setTitle: function(title) {
      this._dom.title.textContent = title;
    }
  };

  return IndexView;

})();
