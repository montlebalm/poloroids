describe("IndexView", function() {

  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();

    IndexView.prototype._bindEvents = this.sandbox.spy();
    IndexView.prototype._setTitle = this.sandbox.spy();

    this.view = new IndexView(document.body, {
      photoService: {
        query: function() {}
      },
      onLoad: this.sandbox.spy()
    });
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  it("automatically binds events", function() {
    expect(this.view._bindEvents.called).to.be.true;
  });

  describe("hideLoading()", function() {

    it("shows the loading indicator", function() {
      this.view._dom = {
        loader: document.createElement("div"),
        photosContainer: document.createElement("div")
      };
      var loaderAdd = this.sandbox.spy(this.view._dom.loader.classList, "add");
      var photosRemove = this.sandbox.spy(this.view._dom.photosContainer.classList, "remove");

      this.view.hideLoading();
      expect(loaderAdd.calledWith("hide")).to.be.true;
      expect(photosRemove.calledWith("hide")).to.be.true;
    });

  });

  describe("showLoading()", function() {

    it("hides the loading indicator", function() {
      this.view._dom = {
        loader: document.createElement("div"),
        photosContainer: document.createElement("div")
      };
      var loaderRemove = this.sandbox.spy(this.view._dom.loader.classList, "remove");
      var photosAdd = this.sandbox.spy(this.view._dom.photosContainer.classList, "add");

      this.view.showLoading();
      expect(loaderRemove.calledWith("hide")).to.be.true;
      expect(photosAdd.calledWith("hide")).to.be.true;
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

    it("shows a loading indicator", function() {
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
      expect(this.album.preload.calledWith("small")).to.be.true;
    });

    it("invokes 'onLoad' on album preload", function() {
      this.album.preload = function(size, callback) {
        callback();
      };
      this.view.load();
      expect(this.view._onLoad.called).to.be.true;
    });

    it("hides loading indicator on album preload", function() {
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
      var album = { preload: function() {} };
      this.view.album = { add: this.sandbox.spy() };
      this.view._photoService = {
        query: function(callback) {
          callback(null, album);
        }.bind(this)
      };
      this.view.loadMore();
      expect(this.view.album.add.called).to.be.true;
    });

    it("preloads the album", function() {
      var album = { add: function() {}, preload: this.sandbox.spy() };
      this.view._photoService = {
        query: function(callback) {
          callback(null, album);
        }.bind(this)
      };
      this.view.loadMore();
      expect(album.preload.called).to.be.true;
    });

  });

});
