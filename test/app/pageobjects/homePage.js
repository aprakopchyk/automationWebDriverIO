const BasePage = require("../../framework/basePage");
const Label = require("../../framework/commonElements/label");
const Link = require("../../framework/commonElements/link");

class HomePage extends BasePage {
  constructor() {
    super(
      new Label(
        ".//button[@class='start__button' and text()='NO']",
        "Home page indicator"
      )
    );
    this.navigationLink = new Link(
      ".//a[@class='start__link' and text()='HERE']",
      "Navigation link"
    );
  }

  async clickOnNavigationLink() {
    await this.navigationLink.click();
  }
}

module.exports = new HomePage();
