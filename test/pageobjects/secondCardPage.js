const BasePage = require("../elements/basePage");
const Checkbox = require("../elements/commonElements/checkbox");
const Label = require("../elements/commonElements/label");
const ListItem = require("../elements/commonElements/listItem");
const Link = require("../elements/commonElements/link");
const ThirdCardPage = require("../pageobjects/thirdCardPage");

class SecondCardPage extends BasePage {
  constructor() {
    super(new Label(".avatar-and-interests__title", "Second page indicator"));
    this.unselectCheckbox = new Checkbox(
      "label[for='interest_unselectall']",
      "Unselect checkbox"
    );
    this.randomCheckbox = new ListItem(
      ".avatar-and-interests__interests-list__item",
      "Random checkbox"
    );
    this.navigationLink = new Link(
      ".button.button--stroked.button--white.button--fluid",
      "Navigation link"
    );
    this.validationError = new Label(
      ".avatar-and-interests__error",
      "Validation error"
    );
  }

  async selectUnselectCheckbox() {
    await this.unselectCheckbox.click();
  }

  async selectRandomInterests(index) {
    await this.randomCheckbox.selectValueByIndex(index);
  }

  async clickOnNavigationLink() {
    await this.navigationLink.click();
    await ThirdCardPage.isUniqueElementVisible();
  }

  async getValidationErrorText() {
    return await this.validationError.getText();
  }
  async getValidationErrorTextColor() {
    const colorProperty = await this.validationError.getCSSProperty("color");
    return colorProperty.value;
  }
}

module.exports = new SecondCardPage();
