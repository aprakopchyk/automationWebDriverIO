const ArrayUtils = require("../../framework/utils/arrayUtils");
const StringUtils = require("../../framework/utils/stringUtils");
const BasePage = require("../../framework/basePage");
const Label = require("../../framework/commonElements/label");
const Input = require("../../framework/commonElements/input");
const Link = require("../../framework/commonElements/link");
const Button = require("../../framework/commonElements/button");
const Form = require("../../framework/commonElements/form");
const testData = require("../testData/testData");

class NewslettersPage extends BasePage {
  constructor() {
    super(
      new Label(
        "(//label[contains(@class, 'unchecked-label')])[last()]",
        "Newsletter page indicator"
      )
    );
    this.selectNewslettersButton = new Button(
      "//label[contains(@class, 'unchecked-label')]",
      "Select newsletters buttons"
    );
    this.emailForm = new Form(
      "//section[contains(@class, 'sticky bottom')]",
      "Email form"
    );
    this.emailInput = new Input(
      "//input[contains(@type, 'email')]",
      "Email input"
    );
    this.continueButton = new Button(
      "//input[contains(@data-event, 'NL')]",
      "'Continue' button"
    );
    this.euronewsNewsletterPreviewLink = new Link(
      "//a[contains(@href, 'euronews-today')]",
      "Euronews newsletter preview link"
    );
    this.euronewsPreviewForm = new Form(
      "//div[contains(@id, 'today_previews')]",
      "Euronews preview form"
    );
    this.closeButtonOnPreviewForm = new Button(
      "//a[contains(@href, '#close')]",
      "Close preview form button"
    );
    this.previewLinks = new Link(
      "//a[contains(@href, 'previews')]",
      "Previews links"
    );
    this.homePage = new Link("//a[@href='/']");
  }

  async getNewsletterName(name) {
    return new Label(`//h2[contains(text(), '${name}')]`, "Newsletter name");
  }

  async getNewsletterFrequency(name) {
    return new Label(
      `//h2[contains(text(), '${name}')]/following-sibling::p[contains(@class, 'text-gray')]`,
      "Newsletter frequency"
    );
  }

  async getNewsletterDescription(name) {
    return new Label(
      `//h2[contains(text(), '${name}')]/following-sibling::div[contains(@class, 'mt-6')]`,
      "Newsletter description"
    );
  }

  async selectRandomSubscriptionPlan() {
    const allPlans = await this.selectNewslettersButton.getAllElements();
    this.randomSubscriptionPlan =
      ArrayUtils.selectRandomValueFromArray(allPlans);
    await this.randomSubscriptionPlan.click();
  }

  async buttonIsChanged() {
    const className = await this.randomSubscriptionPlan.getAttribute("class");
    return className.includes(testData.testDataValues.hiddenAttribute);
  }

  async formIsAtTheBottom() {
    const position = await this.emailForm.getCSSProperty("position");
    const bottom = await this.emailForm.getCSSProperty("bottom");
    return (
      position.value == testData.testDataValues.positionValue &&
      bottom.value == testData.testDataValues.bottomValue
    );
  }

  async enterEmail() {
    this.randomEmail = StringUtils.generateRandomEmail(
      testData.testDataValues.emailUsernameLength,
      testData.testDataValues.emailDomatinLength
    );
    await this.emailInput.setValue(this.randomEmail);
  }

  async clickOnContinueButton() {
    await this.continueButton.click();
  }

  async getNewsletterText(newsletterName) {
    this.newsletterName = await this.getNewsletterName(newsletterName);
    this.newsletterFrequency = await this.getNewsletterFrequency(
      newsletterName
    );
    this.newsletterDescription = await this.getNewsletterDescription(
      newsletterName
    );

    const name = await this.newsletterName.getText();
    const frequency = await this.newsletterFrequency.getText();
    const description = await this.newsletterDescription.getText();

    return [name, frequency, description];
  }

  async clickOnEuronewsNewsletterPreviewLink() {
    await this.euronewsNewsletterPreviewLink.moveTo();
    await this.euronewsNewsletterPreviewLink.click();
  }

  async clickOnPreviewCloseButton() {
    await this.closeButtonOnPreviewForm.click();
  }

  async clickOnOtherNewsletterPreviewLink() {
    const previewLinks = await this.previewLinks.getAllElements();
    const excludedElement =
      await this.euronewsNewsletterPreviewLink.getElement();
    const randomElement = ArrayUtils.getRandomElementFromArrayExcluding(
      previewLinks,
      excludedElement
    );
    await randomElement.click();
  }

  async clickOnLogoIcon() {
    await this.homePage.click();
  }
}

module.exports = new NewslettersPage();
