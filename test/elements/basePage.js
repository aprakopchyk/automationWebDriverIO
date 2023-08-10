class BasePage {
  constructor(uniqueElement, name) {
    if (this.constructor == BasePage) {
      throw new Error("Abstracted classes cant be instantiated.");
    }
    this.uniqueElement = uniqueElement;
    this.name = name;
  }

  async isUniqueElementVisible() {
    const uniqueElementVisible = await this.uniqueElement.waitForDisplayed();
    return uniqueElementVisible;
  }
}

module.exports = BasePage;
