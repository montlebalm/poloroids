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

    it("renders new thumbnails", function() {
      var album = { photos: [] };
      var renderThumbnails = this.sandbox.stub(this.view, "_renderThumbnails");
      this.view.load(album);
      expect(renderThumbnails.called).to.be.true;
    });

  });

});
