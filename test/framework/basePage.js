class BasePage {
  constructor(uniqueElement, name) {
    if (this.constructor == BasePage) {
      throw new Error("Abstracted classes cant be instantiated.");
    }
    this.uniqueElement = uniqueElement;
    this.name = name;
  }

  async isUniqueElementVisible() {
    return await this.uniqueElement.waitForDisplayed();
  }
}

module.exports = BasePage;
