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
      var renderInto = this.sandbox.stub(this.view, "_renderInto");
      this.view.load({ photos: [] });
      expect(renderInto.called).to.be.true;
    });

  });

});
