const BasePage = require("../elements/basePage");
const Label = require("../elements/commonElements/label");
const Link = require("../elements/commonElements/link");

class ThirdCardPage extends BasePage {
  constructor() {
    super(new Label(".personal-details__form-table", "Third page indicator"));
  }

  async selectRandomInterests(index) {
    this.unselectCheckbox.click();
    this.randomCheckbox.selectValueByIndex(index);
  }
}

module.exports = new ThirdCardPage();
