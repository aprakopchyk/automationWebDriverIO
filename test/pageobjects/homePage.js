const BasePage = require("../elements/basePage");
const Label = require("../elements/commonElements/label");
const Link = require("../elements/commonElements/link");
const FirstCardPage = require("../pageobjects/firstCardPage");

class HomePage extends BasePage {
  constructor() {
    super(new Label(".start__button", "Home page indicator"));
    this.navigationLink = new Link(".start__link", "Navigation link");
  }

  async clickOnNavigationLink() {
    await this.navigationLink.click();
    await FirstCardPage.isUniqueElementVisible();
  }
}

module.exports = new HomePage();
