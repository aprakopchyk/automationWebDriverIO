class MarketGamePage {
  get itemName() {
    return $("#largeiteminfo_item_name");
  }
  get itemType() {
    return $("#largeiteminfo_item_type");
  }
  get itemDescription() {
    return $("#largeiteminfo_item_descriptors");
  }

  async getItemName() {
    return await this.itemName.getText();
  }

  async getItemType() {
    return await this.itemType.getText();
  }

  async getItemDescription() {
    return await this.itemDescription.getText();
  }
}

module.exports = new MarketGamePage();
