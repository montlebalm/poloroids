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
      this.view._dom = {
        lightbox: {
          classList: {
            add: this.sandbox.spy(),
            remove: this.sandbox.spy()
          }
        },
        shadow: {
          classList: {
            add: this.sandbox.spy()
          }
        }
      };
      this.view.close();
      expect(this.view._dom.lightbox.classList.add.calledWith("hide")).to.be.true;
      expect(this.view._dom.shadow.classList.add.calledWith("hide")).to.be.true;
    });

  });

  describe("isOpen()", function() {

    it("returns true when lightbox is open", function() {
      this.view._dom.lightbox = {
        classList: {
          contains: function() {
            return false;
          }
        }
      };
      expect(this.view.isOpen()).to.be.true;
    });

    it("returns false when lightbox is closed", function() {
      this.view._dom.lightbox = {
        classList: {
          contains: function() {
            return true;
          }
        }
      };
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
      var photo = { preload: function() {} };
      this.view.load(photo);
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
      this.view._dom = {
        lightbox: {
          classList: {
            add: this.sandbox.spy(),
            remove: this.sandbox.spy()
          }
        },
        shadow: {
          classList: {
            remove: this.sandbox.spy()
          }
        }
      };
      this.view.open();
      expect(this.view._dom.lightbox.classList.remove.calledWith("hide")).to.be.true;
      expect(this.view._dom.shadow.classList.remove.calledWith("hide")).to.be.true;
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
