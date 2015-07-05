window.http = (function() {

  return {
    jsonp: function(url, name, callback) {
      window[name] = callback || "callback";
      var script = document.createElement("script");
      script.src = url;
      document.querySelector("head").appendChild(script);
    },
    url: function(base, qs) {
      var parts = Object.keys(qs || {}).map(function(key) {
        return key + "=" + qs[key];
      });

      if (parts.length > 0) {
        base += "?";
      }

      return base + parts.join("&");
    }
  };

})();
