class AboutPage {
  get gamersOnline() {
    return $$(".online_stat")[0];
  }
  get gamersPlaying() {
    return $$(".online_stat")[1];
  }
  async comparePlayers() {
    const gamersOnlineText = await this.gamersOnline.getText();
    const gamersPlayingText = await this.gamersPlaying.getText();

    const gamersOnline = parseInt(
      gamersOnlineText.split("\n")[1].replace(/,/g, ""),
      10
    );
    const gamersPlaying = parseInt(
      gamersPlayingText.split("\n")[1].replace(/,/g, ""),
      10
    );

    return gamersOnline > gamersPlaying;
  }
}

module.exports = new AboutPage();
