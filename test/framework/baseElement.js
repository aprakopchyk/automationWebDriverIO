const logger = require("../framework/utils/logger");
const config = require("../framework/utils/config");

class BaseElement {
  constructor(locator, name) {
    if (this.constructor === BaseElement) {
      throw new Error("Abstracted classes cant be instantiated");
    }
    this.locator = locator;
    this.name = name;
  }

  async getElement() {
    const element = await $(this.locator);
    logger.info(`Element: ${this.name} was fetched`);
    return element;
  }

  async getAllElements() {
    const elements = await $$(this.locator);
    logger.info(`Elements: ${this.name} were fetched`);
    return elements;
  }

  async waitForDisplayed() {
    const element = await this.getElement();
    try {
      await element.waitForDisplayed(config.config.elementLoad);
      logger.info(`Element: ${this.name} was found and is displayed`);
      return true;
    } catch (error) {
      logger.error(`Element: ${this.name} was not found`);
      return false;
    }
  }

  async waitForElementToBeNotDisplayed() {
    const element = await this.getElement();
    try {
      await element.waitForDisplayed({
        timeout: config.config.elementLoad,
        reverse: true,
      });
      logger.info(`Element: ${this.name} was not found and is not displayed`);
      return true;
    } catch (error) {
      logger.error(`Element: ${this.name} is still displayed`);
      return false;
    }
  }

  async click() {
    const element = await this.getElement();
    try {
      await element.click();
      logger.info(`Element: ${this.name} was clicked`);
    } catch (error) {
      logger.error(`Error clicking on element: ${this.name}`);
      throw error;
    }
  }

  async clickOnAllElements() {
    const elements = await this.getAllElements();
    try {
      for (let element of elements) {
        await element.click();
      }
      logger.info(`Elements: ${this.name} were clicked`);
    } catch (error) {
      logger.error(`Error clicking on elements: ${this.name}`);
      throw error;
    }
  }

  async doubleClick() {
    const element = await this.getElement();
    try {
      await element.doubleClick();
      logger.info(`Element: ${this.name} was double clicked`);
    } catch (error) {
      logger.error(`Error during double clicking on element: ${this.name}`);
      throw error;
    }
  }

  async moveTo() {
    const element = await this.getElement();
    try {
      element.moveTo();
      logger.info(`Moved to element: ${this.name}`);
    } catch (error) {
      logger.error(`Error moving to element: ${this.name}`);
      throw error;
    }
  }

  async getText() {
    const element = await this.getElement();
    try {
      logger.info(`Getting the text of element: ${this.name}`);
      return element.getText();
    } catch (error) {
      logger.error(`Error getting text from element: ${this.name}`);
      throw error;
    }
  }

  async getTextFromAllElements() {
    const elements = await this.getAllElements();
    try {
      logger.info(`Getting the text of elements: ${this.name}`);
      const textArray = [];
      for (let element of elements) {
        const text = await element.getText();
        textArray.push(text);
      }
      return textArray;
    } catch (error) {
      logger.error(`Error getting text from an element in ${this.name}`);
      throw error;
    }
  }

  async getCSSProperty(value) {
    const element = await this.getElement();
    try {
      logger.info(`Getting the CSS of element: ${this.name}`);
      return element.getCSSProperty(value);
    } catch (error) {
      logger.error(`Error getting CSS property from element: ${this.name}`);
      throw error;
    }
  }

  async getAttribute(attributeName) {
    const element = await this.getElement();
    try {
      const attributeValue = await element.getAttribute(attributeName);
      logger.info(
        `Successfully retrieved the attribute: ${attributeName} with value: ${attributeValue} from element: ${this.name}`
      );
      return attributeValue;
    } catch (error) {
      logger.error(
        `Error getting ${attributeName} attribute of element: ${this.name}. Error: ${error.message}`
      );
      throw error;
    }
  }
}

module.exports = BaseElement;
