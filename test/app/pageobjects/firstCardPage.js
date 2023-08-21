const BasePage = require("../../framework/basePage");
const Input = require("../../framework/commonElements/input");
const Dropdown = require("../../framework/commonElements/dropdown");
const Link = require("../../framework/commonElements/link");
const ListItem = require("../../framework/commonElements/listItem");
const Checkbox = require("../../framework/commonElements/checkbox");
const Label = require("../../framework/commonElements/label");
const Button = require("../../framework/commonElements/button");
const Form = require("../../framework/commonElements/form");
const ArrayUtils = require("../../framework/utils/arrayUtils");
const testData = require("../testData/testData");

class FirstCardPage extends BasePage {
  constructor() {
    super(new Label("//div[contains(@class, 'logo')]", "First page indicator"));
    this.passwordField = new Input(
      "//div[contains(@class, 'login')]//input[contains(@placeholder, 'Choose Password')]",
      "Password"
    );
    this.emailField = new Input(
      "//div[contains(@class, 'align')]//input[contains(@placeholder, 'Your email')]",
      "Email"
    );
    this.domainField = new Input(
      "//div[contains(@class, 'align')]//input[contains(@placeholder, 'Domain')]",
      "Domain name"
    );
    this.domainZone = new Dropdown(
      "//div[contains(@class, 'dropdown__field')]",
      "Domain zone"
    );
    this.domainValues = new ListItem(
      "//div[contains(@class, 'dropdown__list')]",
      "Domain values"
    );
    this.checkbox = new Checkbox(
      "//span[contains(@class, 'checkbox')]",
      "Checkbox"
    );
    this.navigationLink = new Link(
      "//a[contains(@class, 'button') and contains(text(), 'Next')]",
      "Navigation link"
    );
    this.sendToBottomButton = new Button(
      "//button[contains(@class, 'button') and contains(., 'Send')]",
      "Send to bottom button"
    );
    this.helpForm = new Form(
      "//div[contains(@class, 'help-form')]",
      "Help form"
    );
    this.cookies = new Form(
      "//div[contains(@class, 'cookies')]",
      "Cookies form"
    );
    this.acceptCookiesButton = new Button(
      "//button[contains(@class, 'button') and contains(text(), 'Not really, no')]",
      "Accept cookies button"
    );
    this.timer = new Label("//div[contains(@class, 'timer')]", "Timer");
  }

  async enterEmail() {
    this.email = await ArrayUtils.generateEmail();
    await this.emailField.clearAndSetValue(this.email);
  }

  async enterPassword() {
    const password = await ArrayUtils.generatePassword(this.email);
    await this.passwordField.clearAndSetValue(password);
  }

  async enterDomainName() {
    const domain = await ArrayUtils.generateDomainName();
    await this.domainField.clearAndSetValue(domain);
  }

  async enterDomainZone() {
    await this.domainZone.click();
    const domainOptions = await this.domainValues.getAllElements();
    const domainOption = await ArrayUtils.getElementFromArray(domainOptions);
    await domainOption.click();
  }

  async selectTermsAndConditionsCheckbox() {
    await this.checkbox.click();
  }

  async clickOnNavigationLink() {
    await this.navigationLink.click();
  }

  async acceptCookies() {
    await this.cookies.waitForDisplayed();
    await this.acceptCookiesButton.click();
  }

  async getTimerData() {
    return await this.timer.getText();
  }

  async clickHideHelpForm() {
    await this.sendToBottomButton.click();
  }

  async isHelpFormHidden() {
    return await this.helpForm.waitForElementToBeHidden(
      testData.testDataValues.distanceForElementToBeHidden
    );
  }
}

module.exports = new FirstCardPage();
