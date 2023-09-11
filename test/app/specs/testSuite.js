const Browser = require("../../framework/utils/browser");
const logger = require("../../framework/utils/logger");
const config = require("../../framework/utils/config");
const testCasesStatus = require("../../framework/utils/testCasesStatuses");
const HomePage = require("../pageObjects/homePage");
const url = require("../../framework/constants/urls");
const NewslettersPage = require("../pageObjects/newslettersPage");
const RegistrationPage = require("../pageObjects/registrationPage");
const ConfirmationPage = require("../pageObjects/confirmationPage");
const testData = require("../testData/testData");
const { expect } = require("chai");

describe("Euronews app", () => {
  beforeEach(async function () {
    Browser.openUrl(url.urls.baseURL);
    expect(
      await HomePage.isUniqueElementVisible(config.config.pageLoad)
    ).to.be.true;
    logger.info(`Test case starts: ${this.currentTest.title}`);
  });

  afterEach(async function () {
    if (this.currentTest.state === testCasesStatus.failed) {
      logger.error(`Test failed: ${this.currentTest.title}`);
    } else {
      logger.info(`Test case completed: ${this.currentTest.title}`);
    }
  });

  it("Email form verification", async () => {
    await HomePage.clickOnAcceptCookiesButton();
    await HomePage.clicOnkNewslettersLink();

    await NewslettersPage.isUniqueElementVisible(config.config.pageLoad);
    await NewslettersPage.selectRandomSubscriptionPlan();
    await NewslettersPage.emailForm.waitForDisplayed(config.config.elementLoad);
    expect(await NewslettersPage.buttonIsChanged()).to.be.true;
    expect(await NewslettersPage.formIsAtTheBottom()).to.be.true;

    await NewslettersPage.enterEmail();
    await NewslettersPage.clickOnContinueButton();

    await RegistrationPage.isUniqueElementVisible(config.config.pageLoad);
    await RegistrationPage.enterPassword();
    await RegistrationPage.disabledButton.waitForElementToBeNotDisplayed(
      config.config.elementLoad
    );
    await RegistrationPage.clickOnCreateMyAccoutButton();

    await ConfirmationPage.isUniqueElementVisible(config.config.pageLoad);
    expect(NewslettersPage.randomEmail).to.equal(
      await ConfirmationPage.getVerificationEmailText()
    );
    expect(testData.testDataValues.subscriptionMessage).to.equal(
      await ConfirmationPage.getSubscriptionMessageText()
    );
  });

  it("Newsletters page verification", async () => {
    await HomePage.clicOnkNewslettersLink();
    await NewslettersPage.isUniqueElementVisible(config.config.pageLoad);

    expect(
      await NewslettersPage.getNewsletterText(
        testData.testDataValues.greenNewsletterName
      )
    ).to.deep.equal(testData.testDataValues.greenNewsletter);
    expect(
      await NewslettersPage.getNewsletterText(
        testData.testDataValues.watchNewsletterName
      )
    ).to.deep.equal(testData.testDataValues.watchNewsletter);
    expect(
      await NewslettersPage.getNewsletterText(
        testData.testDataValues.cultureNewsletterName
      )
    ).to.deep.equal(testData.testDataValues.cultureNewsletter);

    await NewslettersPage.euronewsNewsletterPreviewLink.waitForDisplayed(
      config.config.elementLoad
    );
    await NewslettersPage.clickOnEuronewsNewsletterPreviewLink();
    await NewslettersPage.euronewsPreviewForm.waitForDisplayed(
      config.config.elementLoad
    );

    await NewslettersPage.clickOnPreviewCloseButton();
    await NewslettersPage.euronewsPreviewForm.waitForElementToBeNotDisplayed(
      config.config.elementLoad
    );

    await NewslettersPage.clickOnOtherNewsletterPreviewLink();
    await NewslettersPage.euronewsPreviewForm.waitForDisplayed(
      config.config.elementLoad
    );

    await NewslettersPage.clickOnPreviewCloseButton();
    await NewslettersPage.euronewsPreviewForm.waitForElementToBeNotDisplayed(
      config.config.elementLoad
    );

    await NewslettersPage.clickOnLogoIcon();
    await HomePage.isUniqueElementVisible(config.config.pageLoad);
  });
});
