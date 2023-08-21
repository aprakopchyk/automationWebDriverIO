const BasePage = require("../../framework/basePage");
const Label = require("../../framework/commonElements/label");

class ThirdCardPage extends BasePage {
  constructor() {
    super(
      new Label(
        "//h3[contains(text(), 'Personal details')]",
        "Third page indicator"
      )
    );
  }
}

module.exports = new ThirdCardPage();
