const logger = require("./utils/logger");
const config = require("../framework/utils/config");

class BaseElement {
  constructor(locator, name) {
    if (this.constructor == BaseElement) {
      throw new Error("Abstracted classes cant be instantiated");
    }
    this.locator = locator;
    this.name = name;
  }

  async getElement() {
    try {
      const element = await $(this.locator);
      logger.info(`Element: ${this.name} was fetched`);
      return element;
    } catch (error) {
      logger.error(`Element: ${this.name} can't be found`);
      throw error;
    }
  }

  async getAllElements() {
    try {
      const elements = await $$(this.locator);
      logger.info(`Elements: ${this.name} were fetched`);
      return elements;
    } catch (error) {
      logger.error(`Elements: ${this.name} can't be found`);
      throw error;
    }
  }

  async waitForDisplayed(timeout) {
    const element = await this.getElement();
    try {
      await element.waitForDisplayed({ timeout });
      logger.info(`Element: ${this.name} was found and is displayed`);
      return true;
    } catch (error) {
      logger.error(`Element: ${this.name} was not found`);
      return false;
    }
  }

  async waitForElementToBeNotDisplayed(timeout) {
    const element = await this.getElement();
    try {
      await element.waitForDisplayed({ timeout, reverse: true });
      logger.info(`Element: ${this.name} was not found and is not displayed`);
      return true;
    } catch (error) {
      logger.error(`Element: ${this.name} is still displayed`);
      return false;
    }
  }

  async getAttribute(attributeName) {
    const element = await this.getElement();
    logger.info(`Getting ${attributeName} attribute of element: ${this.name}`);
    return element.getAttribute(attributeName);
  }

  async click() {
    const element = await this.getElement();
    logger.info(`Clicking on element: ${this.name}`);
    return element.click();
  }

  async getText() {
    const element = await this.getElement();
    logger.info(`Getting the text of element: ${this.name}`);
    return element.getText();
  }

  async getCSSProperty(value) {
    const element = await this.getElement();
    logger.info(`Getting the CSS of element: ${this.name}`);
    return element.getCSSProperty(value);
  }

  async scrollToElement() {
    const element = await this.getElement();
    logger.info(`Scrolling to the element: ${this.name}`);
    await element.scrollIntoView();
  }

  async waitForElementToBeHidden(
    value,
    options = { timeout: config.timeoutTime }
  ) {
    const element = await this.getElement();
    try {
      await element.waitUntil(async () => {
        const elementHeight = await element.getCSSProperty("height");
        return parseFloat(elementHeight.value) < value;
      }, options);
      logger.info(`Condition met for element: ${this.name}`);
      return true;
    } catch (error) {
      logger.error(
        `Condition was not met in time for element ${this.name}: ${error}`
      );
      return false;
    }
  }
}

module.exports = BaseElement;
