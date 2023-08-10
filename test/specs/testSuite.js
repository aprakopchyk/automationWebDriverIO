const config = require("../config/config");
const logger = require("../utils/logger");
const HomePage = require("../pageobjects/homePage");
const FirstCardPage = require("../pageobjects/firstCardPage");
const SecondCardPage = require("../pageobjects/secondCardPage");
const { expect } = require("chai");

describe("Userinterface task", () => {
  beforeEach(async function () {
    const testCaseName = this.currentTest.title;
    logger.info(`Test case starts: ${testCaseName}`);
    await browser.url(config.get("HomePageUrl"));
    await HomePage.isUniqueElementVisible();
  });

  afterEach(function () {
    if (this.currentTest.state === "failed") {
      logger.error(`Test failed: ${this.currentTest.title}`);
    }
  });

  it("Cards navigation", async () => {
    await HomePage.clickOnNavigationLink();

    await FirstCardPage.enterRandomPassword(config.predefinedValues.password);
    await FirstCardPage.enterRandomEmail(config.predefinedValues.email);
    await FirstCardPage.enterRandomDomainName(
      config.predefinedValues.domainName
    );
    await FirstCardPage.selectDropdownValue(
      config.predefinedValues.domainDropdownIndex
    );
    await FirstCardPage.selectTermsAndConditionsCheckbox();
    await FirstCardPage.clickOnNavigationLink();

    await SecondCardPage.selectUnselectCheckbox();
    await SecondCardPage.selectRandomInterests(
      config.predefinedValues.firstInterestIndex
    );
    await SecondCardPage.selectRandomInterests(
      config.predefinedValues.secondInterestIndex
    );
    await SecondCardPage.selectRandomInterests(
      config.predefinedValues.thirdInterestIndex
    );
    await SecondCardPage.clickOnNavigationLink();
    const validationErrorText = await SecondCardPage.getValidationErrorText();
    const validationErrorTextColor =
      await SecondCardPage.getValidationErrorTextColor();
    expect(validationErrorText).to.equal(config.validationTextProperties.text);
    expect(validationErrorTextColor).to.equal(
      config.validationTextProperties.color
    );
  });

  it("Cookies form verification", async () => {
    await HomePage.clickOnNavigationLink();

    await FirstCardPage.acceptCookies();
    const cookiesForm =
      await FirstCardPage.cookies.waitForElementToBeNotDisplayed();
    expect(cookiesForm).to.be.true;
  });

  it("Timer verification", async () => {
    await HomePage.clickOnNavigationLink();

    const timerData = await FirstCardPage.getTimerData();
    expect(timerData).to.equal(config.predefinedValues.timerData);
  });

  it("Help form verification", async () => {
    await HomePage.clickOnNavigationLink();

    await FirstCardPage.clickHideHelpForm();
    const helpFormVisibility = await FirstCardPage.isHelpFormHidden();
    expect(helpFormVisibility).to.be.true;
  });
});
