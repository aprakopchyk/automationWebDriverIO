const chai = require("chai");
const expect = chai.expect;

class Post {
  constructor(userId, id, title, body) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }

  validateGETData(expectedUserId, expectedId) {
    expect(this.userId).to.equal(expectedUserId);
    expect(this.id).to.equal(expectedId);
    expect(this.title).to.not.be.empty;
    expect(this.body).to.not.be.empty;
  }

  validatePOSTData(expectedUserId, expectedTitle, expectedBody) {
    expect(this.userId).to.equal(expectedUserId);
    expect(this.title).to.equal(expectedTitle);
    expect(this.body).to.equal(expectedBody);
    expect(this).to.have.property("id");
  }
}

module.exports = Post;
