const chai = require("chai");
const expect = chai.expect;
const ApiUtils = require("./apiUtils");
const PlaceholderAPI = require("./PlaceholderAPI");
const GET_USER_ID = 10;
const VALID_POSTS_ID = 99;
const INVALID_POSTS_ID = 150;
const POST_USER_ID = 1;
const USERS_ID = 5;
require("dotenv").config();

describe("API tests", function () {
  it("GET Request to get all posts", async () => {
    const apiUtils = new ApiUtils();
    const api = new PlaceholderAPI(apiUtils);
    const { status, headers, data } = await api.getPosts();

    expect(status).to.equal(200);
    expect(headers["content-type"]).to.contain("application/json");

    for (let i = 0; i < data.length - 1; i++) {
      expect(data[i].id).to.be.lessThanOrEqual(data[i + 1].id);
    }
  });

  it("GET request to get post with id=99", async () => {
    const apiUtils = new ApiUtils();
    const api = new PlaceholderAPI(apiUtils);
    const { status, data } = await api.getPost(VALID_POSTS_ID);

    expect(status).to.equal(200);
    expect(data.userId).to.equal(GET_USER_ID);
    expect(data.id).to.equal(VALID_POSTS_ID);
    expect(data.title).not.to.be.empty;
    expect(data.body).not.to.be.empty;
  });

  it("GET request to get post with id=150", async () => {
    const apiUtils = new ApiUtils();
    const api = new PlaceholderAPI(apiUtils);
    const { status, data } = await api.getPost(INVALID_POSTS_ID);

    expect(status).to.equal(404);
    expect(data).to.be.empty;
  });

  it("POST request to create post with userId=1 and random body and random title", async () => {
    const apiUtils = new ApiUtils();
    const api = new PlaceholderAPI(apiUtils);
    const { status, data } = await api.createPost(
      POST_USER_ID,
      "Random title",
      "Random body"
    );

    expect(status).to.equal(201);
    expect(data.userId).to.equal(POST_USER_ID);
    expect(data.id).to.exist;
    expect(data.title).to.equal("Random title");
    expect(data.body).to.equal("Random body");
  });

  it("GET request to get users", async () => {
    const apiUtils = new ApiUtils();
    const api = new PlaceholderAPI(apiUtils);
    const { status, headers, data } = await api.getUsers();

    expect(status).to.equal(200);
    expect(headers["content-type"]).to.contain("application/json");

    const user = data.find((user) => user.id === USERS_ID);
    expect(user).to.deep.equal({
      id: USERS_ID,
      name: "Chelsey Dietrich",
      username: "Kamren",
      email: "Lucio_Hettinger@annie.ca",
      address: {
        street: "Skiles Walks",
        suite: "Suite 351",
        city: "Roscoeview",
        zipcode: "33263",
        geo: {
          lat: "-31.8129",
          lng: "62.5342",
        },
      },
      phone: "(254)954-1289",
      website: "demarco.info",
      company: {
        name: "Keebler LLC",
        catchPhrase: "User-centric fault-tolerant solution",
        bs: "revolutionize end-to-end systems",
      },
    });
  });

  it("GET request to get user with id=5", async () => {
    const apiUtils = new ApiUtils();
    const api = new PlaceholderAPI(apiUtils);
    const { status, headers, data } = await api.getUser(USERS_ID);

    expect(status).to.equal(200);
    expect(headers["content-type"]).to.contain("application/json");

    expect(data).to.deep.equal({
      id: USERS_ID,
      name: "Chelsey Dietrich",
      username: "Kamren",
      email: "Lucio_Hettinger@annie.ca",
      address: {
        street: "Skiles Walks",
        suite: "Suite 351",
        city: "Roscoeview",
        zipcode: "33263",
        geo: {
          lat: "-31.8129",
          lng: "62.5342",
        },
      },
      phone: "(254)954-1289",
      website: "demarco.info",
      company: {
        name: "Keebler LLC",
        catchPhrase: "User-centric fault-tolerant solution",
        bs: "revolutionize end-to-end systems",
      },
    });
  });
});
