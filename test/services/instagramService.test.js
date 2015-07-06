describe("InstagramService", function() {

  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();
    this.stubJsonp = function(res) {
      this.sandbox.stub(http, "jsonp", function(url, callbackName, callback) {
        callback(res);
      });
    }.bind(this);
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe("query()", function() {

    it("parses the API response", function() {
      var response = {
        meta: {
          code: 200
        },
        data: []
      };
      this.stubJsonp(response);
      var parse = this.sandbox.spy(InstagramService, "parse");
      InstagramService.query(function() {});
      expect(parse.calledWith(response.data)).to.be.true;
    });

    it("passes API errors to callback", function() {
      var response = {
        meta: {
          code: 400,
          error_message: "oops"
        }
      };
      this.stubJsonp(response);
      var callback = this.sandbox.spy();
      InstagramService.query(callback);
      expect(callback.calledWith(response.meta.error_message)).to.be.true;
    });

  });

  describe("parse()", function() {

    it("returns an array of Photo objects", function() {
      var data = [{
        user: {
          username: "user"
        },
        images: {
          thumbnail: {
            url: "thumbnail"
          },
          standard_resolution: {
            url: "standard"
          }
        }
      }];
      var parsed = InstagramService.parse(data);
      expect(parsed[0]).to.be.an.instanceof(Photo);
    });

  });

});
