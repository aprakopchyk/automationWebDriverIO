const config = require("../framework/utils/config");

class BasePage {
  constructor(uniqueElement, name) {
    if (this.constructor === BasePage) {
      throw new Error("Abstracted classes cant be instantiated.");
    }
    this.uniqueElement = uniqueElement;
    this.name = name;
  }

  async isUniqueElementVisible() {
    return await this.uniqueElement.waitForDisplayed(config.config.pageLoad);
  }
}

module.exports = BasePage;
