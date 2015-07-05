describe("Photo", function() {

  beforeEach(function() {
    this.photo = new Photo("1", { small: "small", large: "large" });
  });

  it("exposes public properties", function() {
    expect(this.photo.id).to.equal("1");
    expect(this.photo.sizes).to.eql({ small: "small", large: "large" });
  });

});
