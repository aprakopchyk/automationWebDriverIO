class BasePage {
  constructor(uniqueElement, name) {
    if (this.constructor === BasePage) {
      throw new Error("Abstracted classes cant be instantiated.");
    }
    this.uniqueElement = uniqueElement;
    this.name = name;
  }

  async isUniqueElementVisible(timeout) {
    return await this.uniqueElement.waitForDisplayed(timeout);
  }
}

module.exports = BasePage;
