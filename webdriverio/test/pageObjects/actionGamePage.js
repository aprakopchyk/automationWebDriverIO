class ActionGamePage {
  get gameNameNext() {
    return $("#appHubAppName");
  }
  get gameReleaseDateNext() {
    return $(".release_date .date");
  }
  get gamePriceNext() {
    return $(".game_purchase_price.price");
  }
  async gameDataNextPage() {
    const gameNameNext = await this.gameNameNext.getText();
    const gameReleaseDateNext = await this.gameReleaseDateNext.getText();
    const gamePriceText = await this.gamePriceNext.getText();
    const gamePriceNext = gamePriceText.slice(0, -4);

    return {
      gameNameNext: gameNameNext,
      gameReleaseDateNext: gameReleaseDateNext,
      gamePriceNext: gamePriceNext,
    };
  }
}

module.exports = new ActionGamePage();
