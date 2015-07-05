window.InstagramService = (function(Album, http, Photo) {

  var CLIENT_ID = "2fc67bcfd3ef4eae837bd5a1372197b9";
  var JSONP_CALLBACK = "instagramCallback";

  return {
    query: function(callback) {
      var url = http.url("https://api.instagram.com/v1/media/popular", {
        "client_id": CLIENT_ID,
        "callback": JSONP_CALLBACK
      });

      http.jsonp(url, JSONP_CALLBACK, function(res) {
        if (res.meta.code !== 200) {
          return callback(res.meta.error_message);
        }

        var photos = this.parse(res.data);
        var album = new Album("Instagram Popular", photos);
        callback(null, album);
      }.bind(this));
    },
    parse: function(data) {
      return data.map(function(photo) {
        return new Photo(photo.id, {
          small: photo.images.thumbnail.url,
          large: photo.images.standard_resolution.url
        });
      });
    }
  };

})(window.Album, window.http, window.Photo);
