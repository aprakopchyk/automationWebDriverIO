class ActionPage {
  get platform() {
    return $(
      "//div[@class='facetedbrowse_FacetTitle_3L67O' and contains(text(),'Платформа')]"
    );
  }
  get platformValue() {
    return $(
      "//a[@class='facetedbrowse_FacetValueName_3WMvo' and contains(text(),'Linux / SteamOS')]"
    );
  }
  get players() {
    return $(
      "//div[@class='facetedbrowse_FacetTitle_3L67O' and contains(text(),'Игроки')]"
    );
  }
  get playersValue() {
    return $(
      "//a[@class='facetedbrowse_FacetValueName_3WMvo' and contains(text(),'Кооператив')]"
    );
  }
  get style() {
    return $(
      "//div[@class='facetedbrowse_FacetTitle_3L67O' and contains(text(),'Визуальный стиль и перспектива')]"
    );
  }
  get showMore() {
    return $$(".facetedbrowse_FacetValueShowMore_230Th")[1];
  }
  get styleValue() {
    return $(
      "//a[@class='facetedbrowse_FacetValueName_3WMvo' and contains(text(),'Реализм')]"
    );
  }
  get filters() {
    return $(
      "//div[@class='facetedbrowse_FacetMenuTitle_3K6Uu' and contains(text(),'Фильтры')]"
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
  get gameNameNext() {
    return $("#appHubAppName");
  }
  get gameReleaseDateNext() {
    return $(".release_date .date");
  }
  get gamePriceNext() {
    return $(".game_purchase_price.price");
  }

  async filtersSelection() {
    const waitForElementAndClick = async (element) => {
      await element.waitForDisplayed();
      await element.click();
      await browser.pause(1000);
    };
    await waitForElementAndClick(this.style);
    await waitForElementAndClick(this.showMore);
    await waitForElementAndClick(this.styleValue);
    await waitForElementAndClick(this.players);
    await waitForElementAndClick(this.playersValue);
    await waitForElementAndClick(this.platform);
    await waitForElementAndClick(this.platformValue);

    await browser.pause(1000);

    const gamesResultsText = await this.gamesResults.getText();
    const gamesResultsNumber = parseInt(
      gamesResultsText.replace(/\D/g, ""),
      10
    );

    await browser.waitUntil(async () => {
      const gamesList = await this.gamesList;
      return gamesList.length === gamesResultsNumber;
    });

    const gamesList = await this.gamesList;
    const gamesListNumber = gamesList.length;

    return gamesListNumber === gamesResultsNumber;
  }

  async gameDataNextPage() {
    const gameNameNext = await this.gameNameNext.getText();
    const gameReleaseDateNext = await this.gameReleaseDateNext.getText();
    const gamePriceText = await this.gamePriceNext.getText();
    const gamePriceNext = gamePriceText.slice(0, -4);

    return [gameNameNext, gameReleaseDateNext, gamePriceNext];
  }

  async gameData() {
    const gameName = await this.gameName.getText();
    const gameReleaseDateText = await this.gameReleaseDate.getText();
    const gameReleaseDate = gameReleaseDateText.slice(0, -3);
    const gamePrice = await this.gamePrice.getText();

    return [gameName, gameReleaseDate, gamePrice];
  }
}

module.exports = new ActionPage();
