const BaseElement = require("../baseElement");

class ListItem extends BaseElement {
  constructor(locator, name) {
    super(locator, name);
  }

  async selectValueByIndex(index) {
    const options = await this.getAllElements();
    const selectedOption = options[index];
    await selectedOption.click();
    logger.info(`List option element: ${this.name} was selected`);
  }
}

module.exports = ListItem;
