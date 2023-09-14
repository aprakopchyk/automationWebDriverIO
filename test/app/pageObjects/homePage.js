const BasePage = require("../../framework/basePage");
const Label = require("../../framework/commonElements/label");
const Link = require("../../framework/commonElements/link");
const Button = require("../../framework/commonElements/button");

class HomePage extends BasePage {
  constructor() {
    super(
      new Label(
        "//span[contains(@class, 'login__text') and contains(text(), 'Log In')]",
        "Homepage indicator"
      )
    );
    this.newslettersLink = new Link(
      "//span[contains(@data-event, 'newsletter-link')]",
      "Newsletters link"
    );
    this.acceptCookiesButton = new Button(
      "//button[contains(@id, 'agree-button')]",
      "Agree button"
    );
  }

  async clicOnkNewslettersLink() {
    await this.newslettersLink.click();
  }

  async clickOnAcceptCookiesButton() {
    await this.acceptCookiesButton.click();
  }
}

module.exports = new HomePage();
