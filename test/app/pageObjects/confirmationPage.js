const BasePage = require("../../framework/basePage");
const Label = require("../../framework/commonElements/label");

class ConfirmationPage extends BasePage {
  constructor() {
    super(
      new Label(
        "//h1[contains(@id, 'content_caption')]",
        "Confirmation page indicator"
      )
    );
    this.verificationEmail = new Label(
      "//span[contains(@id, 'email-verification')]",
      "Verified email"
    );
    this.subscriptionMessage = new Label(
      "//h1[contains(@id, 'content_caption')]",
      "Header text"
    );
  }

  async getVerificationEmailText() {
    return this.verificationEmail.getText();
  }

  async getSubscriptionMessageText() {
    return this.subscriptionMessage.getText();
  }
}

module.exports = new ConfirmationPage();
