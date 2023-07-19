module.exports = {
  get: (key) => {
    if (key === "MainPageUrl") {
      return "https://store.steampowered.com/";
    }
  },

  filterValues: {
    styleCategory: "Visuals & Viewpoint",
    styleValue: "Realistic",
    playersCategory: "Players",
    playersValue: "Co-op",
    platformCategory: "Platform",
    platformValue: "Linux / SteamOS",
  },
  search: {
    textValue: "Golden",
    itemType: "Immortal",
    itemDescription: "Lifestealer",
  },
};
