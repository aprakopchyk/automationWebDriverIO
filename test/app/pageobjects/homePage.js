const BasePage = require("../../framework/basePage");
const Label = require("../../framework/commonElements/label");
const Link = require("../../framework/commonElements/link");

class HomePage extends BasePage {
  constructor() {
    super(
      new Label(
        "//button[contains(@class, 'button') and contains(text(), 'NO')]",
        "Home page indicator"
      )
    );
    this.navigationLink = new Link(
      "//a[contains(@class, 'link') and contains(text(), 'HERE')]",
      "Navigation link"
    );
  }

  async clickOnNavigationLink() {
    await this.navigationLink.click();
  }
}

module.exports = new HomePage();
