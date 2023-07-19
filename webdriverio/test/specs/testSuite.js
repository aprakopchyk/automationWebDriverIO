const MainPage = require("../pageObjects/mainPage");
const AboutPage = require("../pageobjects/aboutPage");
const CommunityMarketPage = require("../pageobjects/communityMarketPage");
const ActionPage = require("../pageobjects/actionPage");
const ActionGamePage = require("../pageObjects/actionGamePage");
const MarketGamePage = require("../pageObjects/marketGamePage");
const config = require("../config/config");
const logger = require("../utils/logger");
const { expect } = require("chai");

describe("Steam task", () => {
  beforeEach(async function () {
    const testCaseName = this.currentTest.title;
    logger.info(`Test case starts: ${testCaseName}`);
    await browser.url(config.get("MainPageUrl"));
  });

  afterEach(function () {
    if (this.currentTest.state === "failed") {
      logger.error(`Test failed: ${this.currentTest.title}`);
    }
  });

  it("About page verification", async () => {
    await MainPage.goToAboutPage();

    const gamersOnline = await AboutPage.getGamersOnlineNumber();
    const gamersPlaying = await AboutPage.getGamersPlayingNumber();
    expect(gamersOnline).to.be.greaterThan(gamersPlaying);
  });

  it("Community Market page verification", async () => {
    await MainPage.goToCommunityMarketPage();

    await CommunityMarketPage.searchFormOpening();
    expect(await CommunityMarketPage.marketForm.isDisplayed()).to.be.true;

    await CommunityMarketPage.parametrSelection(
      CommunityMarketPage.gameDropdown
    );
    await CommunityMarketPage.parametrSelection(
      CommunityMarketPage.gameSelection
    );
    await CommunityMarketPage.parametrSelection(
      CommunityMarketPage.heroDropdown
    );
    await CommunityMarketPage.parametrSelection(
      CommunityMarketPage.heroSelection
    );
    await CommunityMarketPage.parametrSelection(
      CommunityMarketPage.raritySelection
    );
    await CommunityMarketPage.setValue();

    await CommunityMarketPage.searchClick();
    expect(await CommunityMarketPage.dotaFilter.isDisplayed()).to.be.true;
    expect(await CommunityMarketPage.lifestealerFIlter.isDisplayed()).to.be
      .true;
    expect(await CommunityMarketPage.immortalFilter.isDisplayed()).to.be.true;
    expect(await CommunityMarketPage.goldenFilter.isDisplayed()).to.be.true;
    const firstFiveResults = await CommunityMarketPage.getFirstFiveResults();
    firstFiveResults.forEach((result) =>
      expect(result).to.contain(config.search.textValue)
    );

    const totalBefore = await CommunityMarketPage.getTotal();
    await CommunityMarketPage.filterDeletion(
      CommunityMarketPage.goldenRemoveIcon
    );
    await CommunityMarketPage.filterDeletion(
      CommunityMarketPage.dotaRemoveIcon
    );
    const totalAfter = await CommunityMarketPage.getTotal();
    expect(totalBefore).not.to.equal(totalAfter);

    const firstResultName = await CommunityMarketPage.getFirstResultName();
    await CommunityMarketPage.goToFirstResultPage();
    const itemName = await MarketGamePage.getItemName();
    expect(firstResultName).to.equal(itemName);
    expect(await MarketGamePage.getItemType()).to.include(
      config.search.itemType
    );
    expect(await MarketGamePage.getItemDescription()).to.include(
      config.search.itemDescription
    );
  });

  it("Action page filters verification", async () => {
    await MainPage.goToActionPage();
    await ActionPage.scrollToFilters();
    await ActionPage.filterSelection(
      ActionPage.getCategory(config.filterValues.styleCategory)
    );
    await ActionPage.showMoreClick();
    await ActionPage.filterSelection(
      ActionPage.getCategoryValue(config.filterValues.styleValue)
    );
    await ActionPage.filterSelection(
      ActionPage.getCategory(config.filterValues.playersCategory)
    );
    await ActionPage.filterSelection(
      ActionPage.getCategoryValue(config.filterValues.playersValue)
    );
    await ActionPage.filterSelection(
      ActionPage.getCategory(config.filterValues.platformCategory)
    );
    await ActionPage.filterSelection(
      ActionPage.getCategoryValue(config.filterValues.platformValue)
    );

    const gameResultsNumber = await ActionPage.getGameResultsNumber();
    const gamesListNumber = await ActionPage.getGamesListNumber();
    expect(gameResultsNumber).to.equal(gamesListNumber);

    const gameData = await ActionPage.gameData();

    await ActionPage.goToFirstGame();
    const gameDataNextPage = await ActionGamePage.gameDataNextPage();
    expect(gameData.gameName).to.equal(gameDataNextPage.gameNameNext);
    expect(gameData.gameReleaseDate).to.equal(
      gameDataNextPage.gameReleaseDateNext
    );
    expect(gameData.gamePrice).to.equal(gameDataNextPage.gamePriceNext);
  });
});
