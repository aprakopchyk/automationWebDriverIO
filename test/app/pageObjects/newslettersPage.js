const ArrayUtils = require("../../framework/utils/arrayUtils");
const PreviewFormOnNewslettersPage = require("../pageObjects/previewFormOnNewslettersPage");
const EmailFormOnNewslettersPage = require("../pageObjects/emailFormOnNewslettersPage");
const BasePage = require("../../framework/basePage");
const Label = require("../../framework/commonElements/label");
const Link = require("../../framework/commonElements/link");
const Button = require("../../framework/commonElements/button");

const testData = require("../testData/testData");
const BASE_XPATH = "//a[contains(@href, '{VALUE}')]";
const baseXpath = (value) => BASE_XPATH.replace("{VALUE}", value);

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
    this.euronewsNewsletterPreviewLink = new Link(
      baseXpath("euronews-today"),
      "Euronews newsletter preview link"
    );
    this.previewLinks = new Link(baseXpath("previews"), "Previews links");
    this.homePage = new Link("//a[@href='/']");

    this.previewForm = new PreviewFormOnNewslettersPage();
    this.emailForm = new EmailFormOnNewslettersPage();
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

  async waitForEuronewsPreviewLinkToBeDisplayed() {
    await this.euronewsNewsletterPreviewLink.waitForDisplayed();
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
