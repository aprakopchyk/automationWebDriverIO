const StringUtils = require("../utils/stringUtils");

class AboutPage {
  get gamersOnline() {
    return $$(".online_stat")[0];
  }

  get gamersPlaying() {
    return $$(".online_stat")[1];
  }

  async getGamersOnlineNumber() {
    await this.gamersOnline.waitForDisplayed();
    const gamersOnlineText = await this.gamersOnline.getText();
    return StringUtils.extractNumberFromText(gamersOnlineText, 1);
  }

  async getGamersPlayingNumber() {
    await this.gamersPlaying.waitForDisplayed();
    const gamersPlayingText = await this.gamersPlaying.getText();
    return StringUtils.extractNumberFromText(gamersPlayingText, 1);
  }
}

module.exports = new AboutPage();
