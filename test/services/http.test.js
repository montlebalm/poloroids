describe("http", function() {

  describe("jsonp()", function() {

    it("defines a jsonp callback", function() {
      http.jsonp("", "callback", function() {
        expect(window.callback).to.be.defined;
      });
    });

    it("adds a script to the head", function() {
      http.jsonp("", "", function() {
        var script = document.querySelector("head script");
        expect(script.src).to.eql("testing");
      });
    });

  });

  describe("url()", function() {

    it("combines querystring params", function() {
      var url = http.url("base", {
        one: 1,
        two: 2
      });
      expect(url).to.eql("base?one=1&two=2");
    });

  });

});
