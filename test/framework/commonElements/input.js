const BaseElement = require("../baseElement");
const logger = require("../utils/logger");

class Input extends BaseElement {
  constructor(locator, name) {
    super(locator, name);
  }

  async setValue(value) {
    try {
      const element = await this.getElement();
      logger.info(`Setting value for Element: ${this.name} to: ${value}`);
      await element.setValue(value);
    } catch (error) {
      logger.error(`Error setting value for Element: ${this.name}`);
      throw error;
    }
  }

  async clearValue() {
    try {
      const element = await this.getElement();
      logger.info(`Clearing value for Element: ${this.name}`);
      await element.clearValue();
    } catch (error) {
      logger.error(`Error clearing value for Element: ${this.name}`);
      throw error;
    }
  }

  async addValue(value) {
    try {
      const element = await this.getElement();
      logger.info(`Adding value for Element: ${this.name} to: ${value}`);
      await element.addValue(value);
    } catch (error) {
      logger.error(`Error adding value for Element: ${this.name}`);
      throw error;
    }
  }
}

module.exports = Input;
