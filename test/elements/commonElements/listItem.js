const BaseElement = require("../baseElement");

class ListItem extends BaseElement {
  constructor(locator, name) {
    super(locator, name);
  }

  async selectValueByIndex(index) {
    const options = await this.getAllElements();
    const selectedOption = options[index];
    await selectedOption.click();
  }
}

module.exports = ListItem;
