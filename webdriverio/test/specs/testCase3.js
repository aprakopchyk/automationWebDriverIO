const MainPage = require("../pageobjects/main.page");
const CommunityMarketPage = require("../pageobjects/community.market.page");
const config = require("../pageobjects/config");
const { expect } = require("chai");
const logger = require("../pageobjects/logger");

describe("Проверка фильтров формы SEARCH COMMUNITY MARKET", () => {
  before(async () => {
    logger.info(
      "Test case starts: Проверка фильтров формы SEARCH COMMUNITY MARKET"
    );
    await browser.url(config.get("MainPageUrlEng"));
  });

  after(async () => {
    logger.info(
      "Test case ends: Проверка фильтров формы SEARCH COMMUNITY MARKET"
    );
  });

  afterEach(function () {
    if (this.currentTest.state === "failed") {
      logger.error(`Test failed: ${this.currentTest.title}`);
    }
  });

  it("Открытие страницы Community Market", async () => {
    await MainPage.community.moveTo();
    await MainPage.communityMarket.waitForDisplayed();
    await MainPage.communityMarket.click();
    browser.waitUntil(async () => {
      return (await browser.getUrl()) === config.get("MarketPageUrl");
    });
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.equal(config.get("MarketPageUrl"));
  });
  it("Открытие SEARCH COMMUNITY MARKET", async () => {
    await CommunityMarketPage.showAdvancedOptios.click();
    await CommunityMarketPage.marketForm.waitForDisplayed();
    expect(await CommunityMarketPage.marketForm.isDisplayed()).to.be.true;
  });
  it("Выбор параметров игры", async () => {
    await CommunityMarketPage.parametrsSelection();
  });
  it("Нажатие на кнопку Search", async () => {
    await CommunityMarketPage.searchButton.click();
    expect(await CommunityMarketPage.dotaFilter.isDisplayed()).to.be.true;
    expect(await CommunityMarketPage.lifestealerFIlter.isDisplayed()).to.be
      .true;
    expect(await CommunityMarketPage.immortalFilter.isDisplayed()).to.be.true;
    expect(await CommunityMarketPage.goldenFilter.isDisplayed()).to.be.true;
    await CommunityMarketPage.textVerification();
  });
  it("Удаление фильтров golden и dota 2", async () => {
    let totalBefore = parseInt(
      await CommunityMarketPage.resultsTotal.getText(),
      10
    );
    await CommunityMarketPage.goldenRemoveIcon.click();
    await CommunityMarketPage.goldenRemoveIcon.waitForDisplayed({
      reverse: true,
    });
    await CommunityMarketPage.dotaRemoveIcon.click();
    await CommunityMarketPage.dotaRemoveIcon.waitForDisplayed({
      reverse: true,
    });
    let totalAfter = parseInt(
      await CommunityMarketPage.resultsTotal.getText(),
      10
    );
    expect(totalBefore).not.to.equal(totalAfter);
  });
  it("Переход на страницу первого предмета в списке", async () => {
    await CommunityMarketPage.firstResultName.click();
    CommunityMarketPage.itemNameVerification();

    expect(await CommunityMarketPage.gameName.getText()).to.include("Dota 2");
    expect(await CommunityMarketPage.itemType.getText()).to.include("Immortal");
    expect(await CommunityMarketPage.itemDescription.getText()).to.include(
      "Lifestealer"
    );
  });
});
