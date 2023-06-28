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
      '#global_header .menuitem.supernav.supernav_active[href="https://store.steampowered.com/?snr=1_4_4__global-header"]'
    );
  }
  get storeMain() {
    return $(
      '#global_header .submenuitem[href="https://store.steampowered.com/?snr=1_4_4__global-header"]'
    );
  }
  get action() {
    return $(
      '.gutter_item[href="https://store.steampowered.com/tags/ru/%D0%AD%D0%BA%D1%88%D0%B5%D0%BD/?snr=1_4_4__125"]'
    );
  }
  get language() {
    return $(".pulldown.global_action_link");
  }
  get russianLanguage() {
    return $(
      "//a[@class='popup_menu_item tight' and contains(text(),'Русский (Russian)')]"
    );
  }
}

module.exports = new MainPage();
