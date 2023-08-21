const testData = require("../testData/testData");
const logger = require("../../framework/utils/logger");
const testCasesStatus = require("../../framework/utils/testCasesStatuses");
const HomePage = require("../pageobjects/homePage");
const FirstCardPage = require("../pageobjects/firstCardPage");
const SecondCardPage = require("../pageobjects/secondCardPage");
const ThirdCardPage = require("../pageobjects/thirdCardPage");
const { expect } = require("chai");

describe("Userinterface task", () => {
  beforeEach(async function () {
    const testCaseName = this.currentTest.title;
    logger.info(`Test case starts: ${testCaseName}`);
    await browser.url(testData.get("BaseURL"));
    expect(await HomePage.isUniqueElementVisible()).to.be.true;
  });

  afterEach(function () {
    if (this.currentTest.state === testCasesStatus.failed) {
      logger.error(`Test failed: ${this.currentTest.title}`);
    }
  });

  it("Cards navigation", async () => {
    await HomePage.clickOnNavigationLink();
    expect(await FirstCardPage.isUniqueElementVisible()).to.be.true;

    await FirstCardPage.enterEmail();
    await FirstCardPage.enterPassword();
    await FirstCardPage.enterDomainName();
    await FirstCardPage.enterDomainZone();
    await FirstCardPage.selectTermsAndConditionsCheckbox();
    await FirstCardPage.clickOnNavigationLink();
    expect(await SecondCardPage.isUniqueElementVisible()).to.be.true;

    await SecondCardPage.selectUnselectCheckbox();
    await SecondCardPage.selectInterestCheckbox();
    await SecondCardPage.selectInterestCheckbox();
    await SecondCardPage.selectInterestCheckbox();

    await SecondCardPage.clickOnNavigationLink();
    expect(await ThirdCardPage.isUniqueElementVisible()).to.be.true;
    const validationErrorText = await SecondCardPage.getValidationErrorText();
    const validationErrorTextColor =
      await SecondCardPage.getValidationErrorTextColor();
    expect(validationErrorText).to.equal(testData.testDataValues.text);
    expect(validationErrorTextColor).to.equal(testData.testDataValues.color);
  });

  it("Cookies form verification", async () => {
    await HomePage.clickOnNavigationLink();
    expect(await FirstCardPage.isUniqueElementVisible()).to.be.true;

    await FirstCardPage.acceptCookies();
    const cookiesForm =
      await FirstCardPage.cookies.waitForElementToBeNotDisplayed();
    expect(cookiesForm).to.be.true;
  });

  it("Timer verification", async () => {
    await HomePage.clickOnNavigationLink();
    expect(await FirstCardPage.isUniqueElementVisible()).to.be.true;

    const timerData = await FirstCardPage.getTimerData();
    expect(timerData).to.equal(testData.testDataValues.timerData);
  });

  it("Help form verification", async () => {
    await HomePage.clickOnNavigationLink();
    expect(await FirstCardPage.isUniqueElementVisible()).to.be.true;

    await FirstCardPage.clickHideHelpForm();
    const helpFormVisibility = await FirstCardPage.isHelpFormHidden();
    expect(helpFormVisibility).to.be.true;
  });
});
