describe("Photo", function() {

  beforeEach(function() {
    this.author = "me";
    this.createdDate = new Date();
    this.sizes = { small: "small", large: "large" };
    this.title = "title";

    this.photo = new Photo("1", {
      author: this.author,
      createdDate: this.createdDate,
      sizes: this.sizes,
      title: this.title
    });
  });

  it("exposes public properties", function() {
    expect(this.photo.id).to.equal("1");
    expect(this.photo.author).to.eql(this.author);
    expect(this.photo.createdDate).to.eql(this.createdDate);
    expect(this.photo.sizes).to.eql(this.sizes);
    expect(this.photo.title).to.eql(this.title);
  });

});
