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
const StringUtils = require("../../framework/utils/stringUtils");

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
    await NewslettersPage.waitForEmailFormToBeDisplayed();
    expect(await NewslettersPage.buttonIsChanged()).to.be.true;
    expect(await NewslettersPage.formIsAtTheBottom()).to.be.true;

    const randomEmail = StringUtils.generateRandomEmail(
      testData.testDataValues.emailUsernameLength,
      testData.testDataValues.emailDomainLength
    );
    await NewslettersPage.enterEmail(randomEmail);
    await NewslettersPage.clickOnContinueButton();

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
    await NewslettersPage.waitForEuronewsPreviewFormToBeDisplayed();

    await NewslettersPage.clickOnPreviewCloseButton();
    await NewslettersPage.waitForEuronewsPreviewFormToBeNotDisplayed();

    await NewslettersPage.clickOnOtherNewsletterPreviewLink();
    await NewslettersPage.waitForEuronewsPreviewFormToBeDisplayed();

    await NewslettersPage.clickOnPreviewCloseButton();
    await NewslettersPage.waitForEuronewsPreviewFormToBeNotDisplayed();

    await NewslettersPage.clickOnLogoIcon();
    await HomePage.isUniqueElementVisible();
  });
});
