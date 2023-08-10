const BasePage = require("../elements/basePage");
const Input = require("../elements/commonElements/input");
const Dropdown = require("../elements/commonElements/dropdown");
const Link = require("../elements/commonElements/link");
const ListItem = require("../elements/commonElements/listItem");
const Checkbox = require("../elements/commonElements/checkbox");
const Label = require("../elements/commonElements/label");
const Button = require("../elements/commonElements/button");
const Form = require("../elements/commonElements/form");
const SecondCardPage = require("../pageobjects/secondCardPage");

class FirstCardPage extends BasePage {
  constructor() {
    super(new Label(".logo__icon", "First page indicator"));
    this.passwordField = new Input(
      '.input[placeholder="Choose Password"]',
      "Password"
    );
    this.emailField = new Input('.input[placeholder="Your email"]', "Email");
    this.domainNameField = new Input(
      '.input[placeholder="Domain"]',
      "Domain name"
    );
    this.topLevelDomainDropdown = new Dropdown(
      ".dropdown__field",
      "Top level domain name"
    );
    this.dropdownValues = new ListItem(
      ".dropdown__list-item",
      "Dropdown values"
    );
    this.checkbox = new Checkbox(".checkbox__box", "Checkbox");
    this.navigationLink = new Link(".button--secondary", "Navigation link");
    this.sendToBottomButton = new Button(
      ".button.button--solid.button--blue.help-form__send-to-bottom-button",
      "Send to bottom button"
    );
    this.helpForm = new Form(".help-form", "Help form");
    this.cookies = new Form(".cookies", "Cookies form");
    this.acceptCookiesButton = new Button(
      ".button.button--solid.button--transparent",
      "Accept cookies button"
    );
    this.timer = new Label(".timer.timer--white.timer--center", "Timer");
  }

  async enterRandomPassword(value) {
    await this.passwordField.clearAndSetValue(value);
  }

  async enterRandomEmail(value) {
    await this.emailField.clearAndSetValue(value);
  }

  async enterRandomDomainName(value) {
    await this.domainNameField.clearAndSetValue(value);
  }

  async selectDropdownValue(index) {
    await this.topLevelDomainDropdown.click();
    await this.dropdownValues.selectValueByIndex(index);
  }

  async selectTermsAndConditionsCheckbox() {
    await this.checkbox.click();
  }

  async clickOnNavigationLink() {
    await this.navigationLink.click();
    await SecondCardPage.isUniqueElementVisible();
  }

  async clickHideHelpForm() {
    await this.sendToBottomButton.click();
  }

  async acceptCookies() {
    await this.cookies.waitForDisplayed();
    await this.acceptCookiesButton.click();
  }

  async getTimerData() {
    return await this.timer.getText();
  }

  async isHelpFormHidden() {
    const className = await this.helpForm.getAttribute("class");
    return className.includes("is-hidden");
  }
}

module.exports = new FirstCardPage();
