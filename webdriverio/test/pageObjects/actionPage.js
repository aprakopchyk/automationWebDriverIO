const UniversalUtils = require("../utils/universalUtils");
const config = require("../config/config");

class ActionPage {
  get showMore() {
    return $$(".facetedbrowse_FacetValueShowMore_230Th")[1];
  }
  get filters() {
    return $(
      "//div[@class='facetedbrowse_FacetMenuTitle_3K6Uu' and contains(text(),'Narrow By')]"
    );
  }
  get gamesResults() {
    return $(".facetedbrowse_FacetedBrowseMatchCount_3jXlH");
  }
  get gamesList() {
    return $$(
      ".salepreviewwidgets_StoreSaleWidgetOuterContainer_38DqR.Panel.Focusable"
    );
  }
  get gameName() {
    return $(
      ".salepreviewwidgets_StoreSaleWidgetTitle_3jI46.StoreSaleWidgetTitle"
    );
  }
  get gameReleaseDate() {
    return $(".salepreviewwidgets_StoreSaleWidgetRelease_3eOdk");
  }
  get gamePrice() {
    return $(
      ".salepreviewwidgets_StoreSaleWidgetRight_1lRFu .salepreviewwidgets_StoreSalePriceBox_Wh0L8"
    );
  }

  async getCategory(name) {
    return $(
      "//div[@class='facetedbrowse_FacetTitle_3L67O' and contains(text(),'${name}')]"
    );
  }
  async getCategoryValue(name) {
    return $(
      "//a[@class='facetedbrowse_FacetValueName_3WMvo' and contains(text(),'${name}')]"
    );
  }
  async scrollToFilters() {
    await UniversalUtils.scrollToElement(this.filters);
  }
  async showMoreClick() {
    await this.showMore.click();
  }
  async filterSelection(element) {
    await UniversalUtils.waitForElementAndClick(element);
  }
  async getGameResultsNumber() {
    const gamesResultsText = await this.gamesResults.getText();
    return UniversalUtils.extractNumberFromText(gamesResultsText, 0);
  }
  async getGamesListNumber() {
    const gamesList = await this.gamesList;
    return gamesList.length;
  }
  async gameData() {
    const gameName = await this.gameName.getText();
    const gameReleaseDateText = await this.gameReleaseDate.getText();
    const gameReleaseDate = gameReleaseDateText.slice(0, -3);
    const gamePrice = await this.gamePrice.getText();

    return {
      gameName: gameName,
      gameReleaseDate: gameReleaseDate,
      gamePrice: gamePrice,
    };
  }
  async goToFirstGame() {
    await this.gameName.moveTo();
    await this.gameName.click();
  }
}

module.exports = new ActionPage();
