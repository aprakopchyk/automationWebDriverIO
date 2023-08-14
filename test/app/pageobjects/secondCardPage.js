const BasePage = require("../../framework/basePage");
const Checkbox = require("../../framework/commonElements/checkbox");
const Label = require("../../framework/commonElements/label");
const ListItem = require("../../framework/commonElements/listItem");
const Link = require("../../framework/commonElements/link");
const UniversalUtils = require("../../framework/utils/universalUtils");

class SecondCardPage extends BasePage {
  constructor() {
    super(
      new Label(
        "//h2[@class='avatar-and-interests__title' and text()='This is me']",
        "Second page indicator"
      )
    );
    this.unselectCheckbox = new Checkbox(
      "//label[@for='interest_unselectall']",
      "Unselect checkbox"
    );
    this.interestCheckboxes = new ListItem(
      "//span[@class='checkbox__box']",
      "Interest checkboxes"
    );
    this.navigationLink = new Link(
      "//button[text()='Next']",
      "Navigation link"
    );
    this.validationError = new Label(
      "//li[@class='avatar-and-interests__error' and text()='Please upload a picture']",
      "Validation error"
    );
    this.selectedInterests = [];
  }

  async selectUnselectCheckbox() {
    await this.navigationLink.scrollToElement();
    await this.unselectCheckbox.click();
  }

  async selectInterestCheckbox() {
    const interestOptions = await this.interestCheckboxes.getAllElements();
    const availableOptions = interestOptions.filter(
      (_, index) => !this.selectedInterests.includes(index)
    );
    if (availableOptions.length === 0) return;
    const interest = UniversalUtils.getElementFromArray(availableOptions);
    this.selectedInterests.push(interestOptions.indexOf(interest));
    await interest.click();
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
