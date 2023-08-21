const BasePage = require("../../framework/basePage");
const Checkbox = require("../../framework/commonElements/checkbox");
const Label = require("../../framework/commonElements/label");
const ListItem = require("../../framework/commonElements/listItem");
const Link = require("../../framework/commonElements/link");
const ArrayUtils = require("../../framework/utils/arrayUtils");

class SecondCardPage extends BasePage {
  constructor() {
    super(
      new Label(
        "//h2[contains(@class, 'title') and contains(text(), 'This is me')]",
        "Second page indicator"
      )
    );
    this.unselectCheckbox = new Checkbox(
      "//label[contains(@for, 'unselectall')]",
      "Unselect checkbox"
    );
    this.interestCheckboxes = new ListItem(
      "//span[contains(@class, 'checkbox')]",
      "Interest checkbox"
    );
    this.navigationLink = new Link(
      "//button[contains(@class, 'button') and contains(text(), 'Next')]",
      "Navigation link"
    );
    this.validationError = new Label(
      "//li[contains(@class, 'error') and contains(text(), 'Please upload a picture')]",
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
    const interest = ArrayUtils.getElementFromArray(availableOptions);
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
