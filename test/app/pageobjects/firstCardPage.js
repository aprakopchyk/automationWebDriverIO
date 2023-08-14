const BasePage = require("../../framework/basePage");
const Input = require("../../framework/commonElements/input");
const Dropdown = require("../../framework/commonElements/dropdown");
const Link = require("../../framework/commonElements/link");
const ListItem = require("../../framework/commonElements/listItem");
const Checkbox = require("../../framework/commonElements/checkbox");
const Label = require("../../framework/commonElements/label");
const Button = require("../../framework/commonElements/button");
const Form = require("../../framework/commonElements/form");
const UniversalUtils = require("../../framework/utils/universalUtils");

class FirstCardPage extends BasePage {
  constructor() {
    super(new Label("//div[@class='logo__icon']", "First page indicator"));
    this.passwordField = new Input(
      "//input[@class='input input--blue input--gray' and @placeholder='Choose Password']",
      "Password"
    );
    this.emailField = new Input(
      "//input[@class='input input--blue input--gray' and @placeholder='Your email']",
      "Email"
    );
    this.domainField = new Input(
      "//input[@class='input input--blue input--gray' and @placeholder='Domain']",
      "Domain name"
    );
    this.domainZone = new Dropdown(
      "//div[@class='dropdown__field' and text()='other']",
      "Domain zone"
    );
    this.domainValues = new ListItem(
      "//div[@class='dropdown__list-item']",
      "Domain values"
    );
    this.checkbox = new Checkbox("//span[@class='checkbox__box']", "Checkbox");
    this.navigationLink = new Link(
      "//a[@class='button--secondary' and text()='Next']",
      "Navigation link"
    );
    this.sendToBottomButton = new Button(
      "//button[@class='button button--solid button--blue help-form__send-to-bottom-button' and span[@class='highlight']='Send']",
      "Send to bottom button"
    );
    this.helpForm = new Form(
      "//div[@class='help-form__container']",
      "Help form"
    );
    this.cookies = new Form("//div[@class='cookies']", "Cookies form");
    this.acceptCookiesButton = new Button(
      "//button[@class='button button--solid button--transparent' and text()='Not really, no']",
      "Accept cookies button"
    );
    this.timer = new Label(
      "//div[@class='timer timer--white timer--center']",
      "Timer"
    );
  }

  async enterEmail() {
    this.email = await UniversalUtils.generateEmail();
    await this.emailField.clearAndSetValue(this.email);
  }

  async enterPassword() {
    const password = await UniversalUtils.generatePassword(this.email);
    await this.passwordField.clearAndSetValue(password);
  }

  async enterDomainName() {
    const domain = await UniversalUtils.generateDomainName();
    await this.domainField.clearAndSetValue(domain);
  }

  async enterDomainZone() {
    await this.domainZone.click();
    const domainOptions = await this.domainValues.getAllElements();
    const domainOption = await UniversalUtils.getElementFromArray(
      domainOptions
    );
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
    return await this.helpForm.waitForElementToBeHidden(50);
  }
}

module.exports = new FirstCardPage();
