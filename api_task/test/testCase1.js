const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
require("dotenv").config();
const Post = require("./postModel");
const { User, Address, Geo, Company } = require("./userModel");
const POSTS_USER_ID = 10;
const POSTS_ID = 99;
const USERS_ID = 5;

describe("API tests", () => {
  it("GET Request to get all posts", (done) => {
    axios
      .get(process.env.urlPosts)
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.contain("application/json");
        const posts = response.data;
        for (let i = 0; i < posts.length - 1; i++) {
          expect(posts[i].id).to.be.lessThanOrEqual(posts[i + 1].id);
        }

        done();
      })

      .catch((error) => {
        done(error);
      });
  });

  it("GET request to get post with id=99", (done) => {
    axios
      .get(process.env.urlPosts + "/99")
      .then((response) => {
        const responseData = response.data;
        const post = new Post(
          responseData.userId,
          responseData.id,
          responseData.title,
          responseData.body
        );
        post.validateGETData(POSTS_USER_ID, POSTS_ID);

        done();
      })

      .catch((error) => {
        done(error);
      });
  });

  it("GET request to get post with id=150", (done) => {
    axios
      .get(process.env.urlPosts + "/150")
      .then((response) => {
        done(new Error("Expected 404 but got success response"));
      })
      .catch((error) => {
        if (error.response) {
          expect(error.response.status).to.equal(404);
          expect(error.response.data).to.be.empty;
        }
        done();
      });
  });

  it("POST request to create post with userId=1 and random body and random title", (done) => {
    const newPost = new Post(1, null, "Random title", "Random body");

    axios
      .post(process.env.urlPosts, newPost)
      .then((response) => {
        expect(response.status).to.equal(201);

        const responseData = response.data;
        const post = new Post(
          responseData.userId,
          responseData.id,
          responseData.title,
          responseData.body
        );

        post.validatePOSTData(newPost.userId, newPost.title, newPost.body);

        done();
      })

      .catch((error) => {
        done(error);
      });
  });

  it("GET request to get users", (done) => {
    axios
      .get(process.env.urlUsers)
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.headers["content-type"]).to.contain("application/json");

        const users = response.data;
        const user5 = users.find((user) => user.id === USERS_ID);

        const user = new User(
          user5.name,
          user5.username,
          user5.email,
          new Address(
            user5.address.street,
            user5.address.suite,
            user5.address.city,
            user5.address.zipcode,
            new Geo(user5.address.geo.lat, user5.address.geo.lng)
          ),
          user5.phone,
          user5.website,
          new Company(
            user5.company.name,
            user5.company.catchPhrase,
            user5.company.bs
          )
        );

        user.validateUserData();

        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it("GET request to get user with id=5", (done) => {
    axios
      .get(process.env.urlUsers + "/5")
      .then((response) => {
        expect(response.status).to.equal(200);
        const responseData = response.data;

        const user = new User(
          responseData.name,
          responseData.username,
          responseData.email,
          new Address(
            responseData.address.street,
            responseData.address.suite,
            responseData.address.city,
            responseData.address.zipcode,
            new Geo(responseData.address.geo.lat, responseData.address.geo.lng)
          ),
          responseData.phone,
          responseData.website,
          new Company(
            responseData.company.name,
            responseData.company.catchPhrase,
            responseData.company.bs
          )
        );

        user.validateUserData();
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
