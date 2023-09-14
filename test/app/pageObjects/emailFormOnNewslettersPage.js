const BasePage = require("../../framework/basePage");
const Form = require("../../framework/commonElements/form");
const Input = require("../../framework/commonElements/input");
const Button = require("../../framework/commonElements/button");
const testData = require("../testData/testData");

class EmailFormOnNewslettersPage extends BasePage {
  constructor() {
    super(
      new Form("//section[contains(@class, 'sticky bottom')]", "Email form")
    );

    this.emailForm = this.uniqueElement;
    this.emailInput = new Input(
      "//input[contains(@type, 'email')]",
      "Email input"
    );
    this.continueButton = new Button(
      "//input[contains(@data-event, 'NL')]",
      "'Continue' button"
    );
  }

  async formIsAtTheBottom() {
    const position = await this.emailForm.getCSSProperty("position");
    const bottom = await this.emailForm.getCSSProperty("bottom");
    return (
      position.value == testData.testDataValues.positionValue &&
      bottom.value == testData.testDataValues.bottomValue
    );
  }

  async waitForEmailFormToBeDisplayed() {
    await this.emailForm.waitForDisplayed();
  }

  async enterEmail(email) {
    await this.emailInput.setValue(email);
  }

  async clickOnContinueButton() {
    await this.continueButton.click();
  }
}

module.exports = new EmailFormOnNewslettersPage();
