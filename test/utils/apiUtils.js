const axios = require("axios");
const logger = require("./logger");

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
        logger.error("Error", error.message);
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
        logger.error("Error", error.message);
        throw new Error(error);
      }
    }
  }
  async isJSON(body) {
    try {
      if (typeof body === "object") {
        JSON.stringify(body);
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }
}

module.exports = ApiUtils;
