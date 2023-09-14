const Browser = require("../../framework/utils/browser");
const StringUtils = require("../../framework/utils/stringUtils");
const logger = require("../../framework/utils/logger");
const testCasesStatus = require("../../framework/utils/testCasesStatuses");
const HomePage = require("../pageObjects/homePage");
const NewslettersPage = require("../pageObjects/newslettersPage");
const RegistrationPage = require("../pageObjects/registrationPage");
const ConfirmationPage = require("../pageObjects/confirmationPage");
const EmailFormOnNewslettersPage = require("../pageObjects/emailFormOnNewslettersPage");
const PreviewFormOnNewslettersPage = require("../pageObjects/previewFormOnNewslettersPage");
const testData = require("../testData/testData");
const url = require("../../framework/constants/urls");
const { expect } = require("chai");

describe("Euronews app", () => {
  beforeEach(async function () {
    Browser.openUrl(url.urls.baseURL);
    expect(await HomePage.isUniqueElementVisible()).to.be.true;
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

    await NewslettersPage.isUniqueElementVisible();
    await NewslettersPage.selectRandomSubscriptionPlan();
    await EmailFormOnNewslettersPage.isUniqueElementVisible();
    expect(await NewslettersPage.buttonIsChanged()).to.be.true;
    expect(await EmailFormOnNewslettersPage.formIsAtTheBottom()).to.be.true;

    const randomEmail = StringUtils.generateRandomEmail(
      testData.testDataValues.emailUsernameLength,
      testData.testDataValues.emailDomainLength
    );
    await EmailFormOnNewslettersPage.enterEmail(randomEmail);
    await EmailFormOnNewslettersPage.clickOnContinueButton();

    await RegistrationPage.isUniqueElementVisible();
    await RegistrationPage.enterPassword(
      StringUtils.generatePassword(testData.testDataValues.passwordLength)
    );
    await RegistrationPage.waitForDisabledButtonToBeNotDisplayed();
    await RegistrationPage.clickOnCreateMyAccoutButton();

    await ConfirmationPage.isUniqueElementVisible();
    expect(randomEmail).to.equal(
      await ConfirmationPage.getVerificationEmailText()
    );
    expect(testData.testDataValues.subscriptionMessage).to.equal(
      await ConfirmationPage.getSubscriptionMessageText()
    );
  });

  it("Newsletters page verification", async () => {
    await HomePage.clicOnkNewslettersLink();
    await NewslettersPage.isUniqueElementVisible();

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

    await NewslettersPage.waitForEuronewsPreviewLinkToBeDisplayed();
    await NewslettersPage.clickOnEuronewsNewsletterPreviewLink();
    await PreviewFormOnNewslettersPage.isUniqueElementVisible();

    await PreviewFormOnNewslettersPage.clickOnPreviewCloseButton();
    await PreviewFormOnNewslettersPage.waitForEuronewsPreviewFormToBeNotDisplayed();

    await NewslettersPage.clickOnOtherNewsletterPreviewLink();
    await PreviewFormOnNewslettersPage.isUniqueElementVisible();

    await PreviewFormOnNewslettersPage.clickOnPreviewCloseButton();
    await PreviewFormOnNewslettersPage.waitForEuronewsPreviewFormToBeNotDisplayed();

    await NewslettersPage.clickOnLogoIcon();
    await HomePage.isUniqueElementVisible();
  });
});
