describe("IndexView", function() {

  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();

    IndexView.prototype._bindEvents = this.sandbox.spy();
    IndexView.prototype._setTitle = this.sandbox.spy();

    this.onLoad = this.sandbox.spy();
    this.view = new IndexView(document.body, {
      photoService: {
        query: function() {}
      },
      onLoad: this.onLoad
    });
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  it("automatically binds events", function() {
    expect(this.view._bindEvents.called).to.be.true;
  });

  describe("hideLoading()", function() {

    it("shows the loader", function() {
      var loader = this.view._dom.loader = document.createElement("div");
      var photosWrapper = this.view._dom.photosWrapper = document.createElement("div");
      this.view.hideLoading();
      expect(loader.classList.contains("hide")).to.be.true;
      expect(photosWrapper.classList.contains("hide")).to.be.false;
    });

  });

  describe("showLoading()", function() {

    it("hides the loader", function() {
      var loader = this.view._dom.loader = document.createElement("div");
      var photosWrapper = this.view._dom.photosWrapper = document.createElement("div");
      this.view.showLoading();
      expect(loader.classList.contains("hide")).to.be.false;
      expect(photosWrapper.classList.contains("hide")).to.be.true;
    });

  });

  describe("load()", function() {

    beforeEach(function() {
      this.album = {
        title: "testing",
        preload: this.sandbox.spy()
      };
      this.sandbox.stub(this.view._photoService, "query", function(callback) {
        callback(null, this.album);
      }.bind(this));
      this.view.showLoading = this.sandbox.spy();
      this.view.hideLoading = this.sandbox.spy();
    });

    it("shows the loader", function() {
      this.view.load();
      expect(this.view.showLoading.called).to.be.true;
    });

    it("queries the photo service", function() {
      this.view.load();
      expect(this.view._photoService.query.called).to.be.true;
    });

    it("sets the title", function() {
      this.view.load();
      expect(this.view._setTitle.calledWith(this.album.title)).to.be.true;
    });

    it("sets the album", function() {
      this.view.load();
      expect(this.view.album).to.be.defined;
    });

    it("preloads the album", function() {
      this.view.load();
      expect(this.view.album.preload.calledWith("small")).to.be.true;
    });

    it("invokes 'onLoad' on album preload", function() {
      this.album.preload = function(size, callback) {
        callback();
      };
      this.view.load();
      expect(this.onLoad.called).to.be.true;
    });

    it("hides loader on album preload", function() {
      this.album.preload = function(size, callback) {
        callback();
      };
      this.view.load();
      expect(this.view.hideLoading.called).to.be.true;
    });

  });

  describe("loadMore()", function() {

    beforeEach(function() {
      this.view.album = {
        add: this.sandbox.spy(),
        preload: this.sandbox.spy()
      };
    });

    it("adds new photos to album", function() {
      this.view.album = {
        add: this.sandbox.spy(),
        preload: function() {}
      };
      this.view._photoService = {
        query: function(callback) {
          callback(null, { photos: [] });
        }.bind(this)
      };
      this.view.loadMore();
      expect(this.view.album.add.called).to.be.true;
    });

    it("preloads the album", function() {
      this.view.album = {
        add: function() {},
        preload: this.sandbox.spy()
      };
      this.view._photoService = {
        query: function(callback) {
          callback(null, { photos: [] });
        }.bind(this)
      };
      this.view.loadMore();
      expect(this.view.album.preload.called).to.be.true;
    });

  });

});
