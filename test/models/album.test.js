describe("Album", function() {

  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();

    this.sandbox.stub(Photo.prototype, "preload", function(size, callback) {
      setTimeout(function() {
        callback();
      }, 10);
    });

    this.album = new Album("testing", [
      new Photo("1", { small: "small", large: "large" }),
      new Photo("2", { small: "small", large: "large" }),
      new Photo("3", { small: "small", large: "large" })
    ]);
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  it("exposes public properties", function() {
    expect(this.album.title).to.be.defined;
    expect(this.album.photos).to.be.defined;
  });

  describe("add()", function() {

    it("adds new photos to the album", function() {
      var photos = [new Photo("4", { small: "small", large: "large" })];
      this.album.add(photos);
      expect(this.album.photos.length).to.eq(4);
    });

    it("doesn't add duplicates", function() {
      var photos = [new Photo("1", { small: "small", large: "large" })];
      this.album.add(photos);
      expect(this.album.photos.length).to.eq(3);
    });

  });

  describe("preload()", function() {

    it("preloads all photos", function() {
      this.album.preload("small", function() {});

      this.album.photos.forEach(function(photo) {
        expect(photo.preload.calledWith("small")).to.be.true;
      });
    });

    it("invokes callback when all photos are preloaded", function(done) {
      this.album.preload("small", function() {
        expect(true).to.be.true;
        done();
      });
    });

  });

  describe("prev()", function() {

    it("returns the previous photo if there is one", function() {
      var prev = this.album.prev(this.album.photos[1]);
      expect(prev).to.eql(this.album.photos[0]);
    });

    it("returns undefined if there is no previous photo", function() {
      var prev = this.album.prev(this.album.photos[0]);
      expect(prev).to.be.undefined;
    });

  });

  describe("next()", function() {

    it("returns the next photo if there is one", function() {
      var next = this.album.next(this.album.photos[1]);
      expect(next).to.eql(this.album.photos[2]);
    });

    it("returns undefined if there is no next photo", function() {
      var next = this.album.next(this.album.photos[2]);
      expect(next).to.be.undefined;
    });

  });

});
