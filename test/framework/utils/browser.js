class Browser {
  static async openUrl(url) {
    await browser.url(url);
  }

  static async sendKeys(keys) {
    await browser.keys(keys);
  }
}

module.exports = Browser;
