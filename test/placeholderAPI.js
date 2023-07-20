const baseUrl = "https://jsonplaceholder.typicode.com";

class PlaceholderAPI {
  constructor(apiUtils) {
    this.apiUtils = apiUtils;
  }

  async getPosts() {
    const url = `${baseUrl}/posts`;
    return this.apiUtils.get(url);
  }

  async getPost(id) {
    const url = `${baseUrl}/posts/${id}`;
    return this.apiUtils.get(url);
  }

  async createPost(userId, title, body) {
    const url = `${baseUrl}/posts`;
    const newPost = { userId, title, body };
    return this.apiUtils.post(url, newPost);
  }

  async getUsers() {
    const url = `${baseUrl}/users`;
    return this.apiUtils.get(url);
  }

  async getUser(id) {
    const url = `${baseUrl}/users/${id}`;
    return this.apiUtils.get(url);
  }
}

module.exports = PlaceholderAPI;
