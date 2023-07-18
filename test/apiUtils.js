const axios = require("axios");

class ApiUtils {
  async get(url) {
    try {
      const response = await axios.get(url);
      return {
        status: response.status,
        headers: response.headers,
        data: response.data,
      };
    } catch (error) {
      if (error.response) {
        return {
          status: error.response.status,
          headers: error.response.headers,
          data: error.response.data,
        };
      } else {
        console.log("Error", error.message);
        throw new Error(error);
      }
    }
  }

  async post(url, data) {
    try {
      const response = await axios.post(url, data);
      return {
        status: response.status,
        headers: response.headers,
        data: response.data,
      };
    } catch (error) {
      if (error.response) {
        return {
          status: error.response.status,
          headers: error.response.headers,
          data: error.response.data,
        };
      } else {
        console.log("Error", error.message);
        throw new Error(error);
      }
    }
  }
}

module.exports = ApiUtils;
