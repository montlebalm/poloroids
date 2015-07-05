describe("Photo", function() {

  beforeEach(function() {
    this.photo = new Photo("small", "large");
  });

  it("exposes public properties", function() {
    expect(this.photo.small).to.be.defined;
    expect(this.photo.large).to.be.defined;
  });

});
