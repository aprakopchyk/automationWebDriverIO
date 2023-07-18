const StringUtils = require("../utils/stringUtils");
const UniversalUtils = require("../utils/universalUtils");

class CommunityMarketPage {
  get showAdvancedOptios() {
    return $("#market_search_advanced_show");
  }
  get marketForm() {
    return $(
      '//div[contains(@class, "newmodal") and contains(., "Search Community Market")]'
    );
  }
  get gameDropdown() {
    return $("#app_option_0_selected");
  }
  get gameSelection() {
    return $("#app_option_570");
  }
  get advancedFilters() {
    return $("#market_advancedsearch_filters");
  }
  get heroDropdown() {
    return $("[name='category_570_Hero[]']");
  }
  get heroSelection() {
    return $("[value='tag_npc_dota_hero_life_stealer']");
  }
  get raritySelection() {
    return $("#tag_570_Rarity_Rarity_Immortal");
  }
  get searchBox() {
    return $("#advancedSearchBox");
  }
  get searchButton() {
    return $("#advancedSearchSubmit");
  }
  get dotaFilter() {
    return $(
      '[href="https://steamcommunity.com/market/search?q=golden&category_570_Hero%5B0%5D=tag_npc_dota_hero_life_stealer&category_570_Slot%5B0%5D=any&category_570_Type%5B0%5D=any&category_570_Rarity%5B0%5D=tag_Rarity_Immortal"]'
    );
  }
  get lifestealerFIlter() {
    return $(
      '[href="https://steamcommunity.com/market/search?q=golden&category_570_Slot%5B0%5D=any&category_570_Type%5B0%5D=any&category_570_Rarity%5B0%5D=tag_Rarity_Immortal&appid=570"]'
    );
  }
  get immortalFilter() {
    return $(
      '[href="https://steamcommunity.com/market/search?q=golden&category_570_Hero%5B0%5D=tag_npc_dota_hero_life_stealer&category_570_Slot%5B0%5D=any&category_570_Type%5B0%5D=any&appid=570"]'
    );
  }
  get goldenFilter() {
    return $(
      '[href="https://steamcommunity.com/market/search?category_570_Hero%5B0%5D=tag_npc_dota_hero_life_stealer&category_570_Slot%5B0%5D=any&category_570_Type%5B0%5D=any&category_570_Rarity%5B0%5D=tag_Rarity_Immortal&appid=570"]'
    );
  }
  get results() {
    return $$("#searchResultsRows");
  }
  get goldenRemoveIcon() {
    return $(
      '[href="https://steamcommunity.com/market/search?category_570_Hero%5B0%5D=tag_npc_dota_hero_life_stealer&category_570_Slot%5B0%5D=any&category_570_Type%5B0%5D=any&category_570_Rarity%5B0%5D=tag_Rarity_Immortal&appid=570"]'
    );
  }
  get dotaRemoveIcon() {
    return $(
      '[href="https://steamcommunity.com/market/search?category_570_Hero%5B0%5D=tag_npc_dota_hero_life_stealer&category_570_Slot%5B0%5D=any&category_570_Type%5B0%5D=any&category_570_Rarity%5B0%5D=tag_Rarity_Immortal"]'
    );
  }
  get resultsTotal() {
    return $("#searchResults_total");
  }
  get firstResultName() {
    return $("#result_0_name");
  }
  async searchFormOpening() {
    await this.showAdvancedOptios.waitForDisplayed();
    await this.showAdvancedOptios.click();
    await this.marketForm.waitForDisplayed();
  }
  async parametrsSelection() {
    await this.gameDropdown.click();
    await this.gameSelection.click();
    await this.advancedFilters.waitForDisplayed();
    await this.heroDropdown.click();
    await this.heroSelection.click();
    await this.raritySelection.click();
    await this.searchBox.setValue("golden");
  }
  async searchClick() {
    await this.searchButton.click();
  }
  async getFirstFiveResults() {
    return await UniversalUtils.getFirstNResults("#searchResultsRows", 5);
  }
  async filtersDeletion() {
    await UniversalUtils.deleteAndWaitForElement(this.goldenRemoveIcon);
    await UniversalUtils.deleteAndWaitForElement(this.dotaRemoveIcon);
  }
  async getTotal() {
    let totalText = await this.resultsTotal.getText();
    return StringUtils.extractNumberFromText(totalText, 0);
  }
  async getFirstResultName() {
    return await this.firstResultName.getText();
  }
  async goToFirstResultPage() {
    await this.firstResultName.click();
  }
}

module.exports = new CommunityMarketPage();
