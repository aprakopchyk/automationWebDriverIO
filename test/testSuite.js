const chai = require("chai");
const expect = chai.expect;
const ApiUtils = require("./utils/apiUtils");
const PlaceholderAPI = require("./PlaceholderAPI");
const statusCodes = require("../test/utils/statusCodes");
const testData = require("../test/testData/testData");

describe("API tests", function () {
  it("GET Request to get all posts", async () => {
    const apiUtils = new ApiUtils();
    const api = new PlaceholderAPI(apiUtils);
    const { status, data } = await api.getPosts();
    expect(status).to.equal(statusCodes.OK);
    expect(await apiUtils.isJSON(data)).to.be.true;
    for (let i = 0; i < data.length - 1; i++) {
      expect(data[i].id).to.be.lessThanOrEqual(data[i + 1].id);
    }
  });

  it("GET request to get post with id=99", async () => {
    const apiUtils = new ApiUtils();
    const api = new PlaceholderAPI(apiUtils);
    const { status, data } = await api.getPost(testData.id.postValidID);
    expect(status).to.equal(statusCodes.OK);
    expect(data.userId).to.equal(testData.id.postUserID);
    expect(data.id).to.equal(testData.id.postValidID);
    expect(data.title).not.to.be.empty;
    expect(data.body).not.to.be.empty;
  });

  it("GET request to get post with id=150", async () => {
    const apiUtils = new ApiUtils();
    const api = new PlaceholderAPI(apiUtils);
    const { status, data } = await api.getPost(testData.id.postInvalidID);
    expect(status).to.equal(statusCodes.NotFound);
    expect(data).to.be.empty;
  });

  it("POST request to create post with userId=1 and random body and random title", async () => {
    const apiUtils = new ApiUtils();
    const api = new PlaceholderAPI(apiUtils);
    const { status, data } = await api.createPost(
      testData.id.userID,
      "Random title",
      "Random body"
    );
    expect(status).to.equal(statusCodes.SuccessfullyCreated);
    expect(data.userId).to.equal(testData.id.userID);
    expect(data.id).to.exist;
    expect(data.title).to.equal("Random title");
    expect(data.body).to.equal("Random body");
  });

  it("GET request to get users", async () => {
    const apiUtils = new ApiUtils();
    const api = new PlaceholderAPI(apiUtils);
    const { status, data } = await api.getUsers();
    expect(status).to.equal(statusCodes.OK);
    expect(await apiUtils.isJSON(data)).to.be.true;
    const user = data.find((user) => user.id === testData.id.userID);
    expect(user).to.deep.equal(testData.user);
  });

  it("GET request to get user with id=5", async () => {
    const apiUtils = new ApiUtils();
    const api = new PlaceholderAPI(apiUtils);
    const { status, data } = await api.getUser(testData.id.userID);
    expect(status).to.equal(statusCodes.OK);
    expect(await apiUtils.isJSON(data)).to.be.true;
    expect(data).to.deep.equal(testData.user);
  });
});
