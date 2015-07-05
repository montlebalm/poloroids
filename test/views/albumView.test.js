describe("AlbumView", function() {

  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();

    this.view = new AlbumView(document.body, {
      onClick: function() {}
    });
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe("load()", function() {

    it("clears existing thumbnails", function() {
      var album = { photos: [] };
      var clear = this.sandbox.stub(this.view, "_clear");
      this.view.load(album);
      expect(clear.called).to.be.true;
    });

    it("renders new thumbnails", function() {
      var album = { photos: [] };
      this.sandbox.stub(this.view, "_clear");
      var renderThumbnails = this.sandbox.stub(this.view, "_renderThumbnails");
      this.view.load(album);
      expect(renderThumbnails.called).to.be.true;
    });

  });

});
