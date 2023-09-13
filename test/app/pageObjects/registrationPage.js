const StringUtils = require("../../framework/utils/stringUtils");
const BasePage = require("../../framework/basePage");
const Label = require("../../framework/commonElements/label");
const Input = require("../../framework/commonElements/input");
const Button = require("../../framework/commonElements/button");
const testData = require("../testData/testData");

class RegistrationPage extends BasePage {
  constructor() {
    super(
      new Label(
        "//button[contains(@id, 'Apple')]",
        "Registration page indicator"
      )
    );
    this.passwordInput = new Input(
      "//input[contains(@type, 'password') and contains(@placeholder, 'password')]",
      "Password input"
    );
    this.createAccountButton = new Button(
      "//input[contains(@type, 'submit') and contains(@value, 'Create')]",
      "'Create my account' button"
    );
    this.disabledButton = new Button(
      "//input[@disabled]",
      "Disabled 'Create my account' button"
    );
  }

  async waitForDisabledButtonToBeNotDisplayed() {
    await this.disabledButton.waitForElementToBeNotDisplayed();
  }

  async enterPassword(password) {
    await this.passwordInput.setValue(password);
  }

  async clickOnCreateMyAccoutButton() {
    await this.createAccountButton.click();
  }
}

module.exports = new RegistrationPage();
