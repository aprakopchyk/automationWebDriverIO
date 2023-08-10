const BaseElement = require("../baseElement");
const logger = require("../../utils/logger");

class Input extends BaseElement {
  constructor(locator, name) {
    super(locator, name);
  }

  async setValue(value) {
    const element = await this.getElement();
    logger.info(`Setting value for Element: ${this.name} to: ${value}`);
    await element.setValue(value);
  }

  async clearValue() {
    const element = await this.getElement();
    logger.info(`Clearing value for Element: ${this.name}`);
    await element.clearValue();
  }

  async clearAndSetValue(value) {
    const element = await this.getElement();
    logger.info(`Clearing value for Element: ${this.name}`);
    await element.clearValue();
    logger.info(`Setting value for Element: ${this.name} to: ${value}`);
    await element.setValue(value);
  }
}

module.exports = Input;
