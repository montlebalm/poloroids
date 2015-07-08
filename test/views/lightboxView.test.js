describe("LightboxView", function() {

  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();

    LightboxView.prototype._bindEvents = this.sandbox.spy();

    this.view = new LightboxView(document.body);
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  it("automatically binds events", function() {
    expect(this.view._bindEvents.called).to.be.true;
  });

  describe("close()", function() {

    it("hides the lightbox and shadow", function() {
      var lightbox = this.view._dom.lightbox = document.createElement("div");
      var shadow = this.view._dom.shadow = document.createElement("div");
      this.view.close();
      expect(lightbox.classList.contains("hide")).to.be.true;
      expect(shadow.classList.contains("hide")).to.be.true;
    });

  });

  describe("isOpen()", function() {

    it("returns true when lightbox is open", function() {
      var lightbox = document.createElement("div");
      this.view._dom.lightbox = lightbox;
      expect(this.view.isOpen()).to.be.true;
    });

    it("returns false when lightbox is closed", function() {
      var lightbox = document.createElement("div");
      lightbox.classList.add("hide");
      this.view._dom.lightbox = lightbox;
      expect(this.view.isOpen()).to.be.false;
    });

  });

  describe("load()", function() {

    beforeEach(function() {
      this.next = {};
      this.prev = {};
      this.view.getNext = function() { return this.next; }.bind(this);
      this.view.getPrev = function() { return this.prev; }.bind(this);
    });

    it("sets new next and previous photos", function() {
      this.view.load({ preload: function() {} });
      expect(this.view.next).to.equal(this.next);
      expect(this.view.prev).to.equal(this.prev);
    });

    it("preloads the photo", function() {
      var photo = { preload: this.sandbox.spy() };
      this.view.load(photo);
      expect(photo.preload.called).to.be.true;
    });

  });

  describe("open()", function() {

    it("hides the lightbox and shadow", function() {
      var lightbox = this.view._dom.lightbox = document.createElement("div");
      var shadow = this.view._dom.shadow = document.createElement("div");
      this.view.open();
      expect(lightbox.classList.contains("hide")).to.be.false;
      expect(shadow.classList.contains("hide")).to.be.false;
    });

  });

  describe("setTraversalMethods()", function() {

    it("sets the `getPrev` and `getNext` methods", function() {
      var methods = {
        next: function() {},
        prev: function() {}
      };
      this.view.setTraversalMethods(methods);
      expect(this.view.getNext).to.equal(methods.next);
      expect(this.view.getPrev).to.equal(methods.prev);
    });

  });

});
