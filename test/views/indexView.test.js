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
        loader: {
          classList: {
            add: this.sandbox.spy(),
            remove: this.sandbox.spy()
          }
        },
        photosContainer: {
          classList: {
            add: this.sandbox.spy(),
            remove: this.sandbox.spy()
          }
        }
      };
      this.view.hideLoading();
      expect(this.view._dom.loader.classList.add.calledWith("hide")).to.be.true;
      expect(this.view._dom.photosContainer.classList.remove.calledWith("hide")).to.be.true;
    });

  });

  describe("showLoading()", function() {

    it("hides the loading indicator", function() {
      this.view._dom = {
        loader: {
          classList: {
            add: this.sandbox.spy(),
            remove: this.sandbox.spy()
          }
        },
        photosContainer: {
          classList: {
            add: this.sandbox.spy(),
            remove: this.sandbox.spy()
          }
        }
      };
      this.view.showLoading();
      expect(this.view._dom.loader.classList.remove.calledWith("hide")).to.be.true;
      expect(this.view._dom.photosContainer.classList.add.calledWith("hide")).to.be.true;
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

});
