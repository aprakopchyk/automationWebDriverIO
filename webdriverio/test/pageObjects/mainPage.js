class MainPage {
  get about() {
    return $(
      '#global_header .menuitem[href="https://store.steampowered.com/about/?snr=1_4_4__global-header"]'
    );
  }
  get community() {
    return $(
      '#global_header .menuitem.supernav[href="https://steamcommunity.com/"]'
    );
  }
  get communityMarket() {
    return $(
      '#global_header .submenuitem[href="https://steamcommunity.com/market/"]'
    );
  }
  get store() {
    return $(
      '#global_header .menuitem.supernav.supernav_active[href="https://store.steampowered.com/?snr=1_4_600__global-header"]'
    );
  }
  get storeMain() {
    return $(
      '#global_header .submenuitem[href="https://store.steampowered.com/?snr=1_4_600__global-header"]'
    );
  }
  get action() {
    return $(
      '.gutter_item[href="https://store.steampowered.com/tags/ru/%D0%AD%D0%BA%D1%88%D0%B5%D0%BD/?snr=1_4_4__125"]'
    );
  }
  async goToAboutPage() {
    await this.about.click();
  }
  async goToCommunityMarketPage() {
    await this.community.moveTo();
    await this.communityMarket.waitForDisplayed();
    await this.communityMarket.click();
  }
  async goToActionPage() {
    await this.action.click();
  }
}

module.exports = new MainPage();
