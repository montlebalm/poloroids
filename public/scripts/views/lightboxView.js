window.LightboxView = (function() {

  var ESCAPE_KEY = 27;
  var LEFT_KEY = 37;
  var RIGHT_KEY = 39;

  function LightboxView(el) {
    this._dom = {
      close: el.querySelector(".close"),
      lightbox: el.querySelector(".lightbox"),
      next: el.querySelector(".next"),
      photo: el.querySelector(".photo"),
      prev: el.querySelector(".prev"),
      shadow: el.querySelector(".lightbox-shadow")
    };
    this._bindEvents();
  }

  LightboxView.prototype = {
    close: function() {
      this._dom.lightbox.classList.add("hide");
      this._dom.lightbox.classList.remove("fadeIn");
      this._dom.shadow.classList.add("hide");
    },
    isOpen: function() {
      return !this._dom.lightbox.classList.contains("hide");
    },
    load: function(photo) {
      this.prev = this.getPrev(photo);
      this.next = this.getNext(photo);
      photo.preload("large", this._loaded.bind(this, photo));
    },
    open: function() {
      this._dom.lightbox.classList.remove("hide");
      this._dom.lightbox.classList.add("fadeIn");
      this._dom.shadow.classList.remove("hide");
    },
    setTraversalMethods: function(methods) {
      this.getPrev = methods.prev || function() {};
      this.getNext = methods.next || function() {};
    },
    _bindEvents: function() {
      this._dom.prev.addEventListener("click", this._prevPhoto.bind(this));
      this._dom.next.addEventListener("click", this._nextPhoto.bind(this));
      this._dom.close.addEventListener("click", this.close.bind(this));
      this._dom.shadow.addEventListener("click", this.close.bind(this));

      window.addEventListener("keydown", function(e) {
        if (!this.isOpen()) { return; }

        switch (e.keyCode) {
          case ESCAPE_KEY:
            this.close();
            break;
          case LEFT_KEY:
            this._prevPhoto();
            break;
          case RIGHT_KEY:
            this._nextPhoto();
            break;
        }
      }.bind(this));
    },
    _loaded: function(photo) {
      this._setPhoto(photo.large);
      this._setPrevVisibility();
      this._setNextVisibility();
      this.open();
    },
    _nextPhoto: function() {
      if (this.next) {
        this.load(this.next);
      }
    },
    _prevPhoto: function() {
      if (this.prev) {
        this.load(this.prev);
      }
    },
    _setNextVisibility: function() {
      if (this.next) {
        this._dom.next.classList.remove("hide");
      } else {
        this._dom.next.classList.add("hide");
      }
    },
    _setPhoto: function(src) {
      this._dom.photo.src = src;
    },
    _setPrevVisibility: function() {
      if (this.prev) {
        this._dom.prev.classList.remove("hide");
      } else {
        this._dom.prev.classList.add("hide");
      }
    }
  };

  return LightboxView;

})();
