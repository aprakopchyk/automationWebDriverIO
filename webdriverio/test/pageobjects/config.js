module.exports = {
  get: (key) => {
    if (key === "MainPageUrlEng") {
      return "https://store.steampowered.com/?l=english";
    }
    if (key === "MainPageUrl") {
      return "https://store.steampowered.com/";
    }
    if (key === "AboutPageUrl") {
      return "https://store.steampowered.com/about/";
    }
    if (key === "MarketPageUrl") {
      return "https://steamcommunity.com/market/";
    }
    if (key === "ActionPageUrl") {
      return "https://store.steampowered.com/tags/ru/%D0%AD%D0%BA%D1%88%D0%B5%D0%BD/";
    }
    if (key === "InsPageUrl") {
      return "https://store.steampowered.com/app/222880/Insurgency/";
    }
  },
};
