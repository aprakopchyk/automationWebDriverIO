const BasePage = require("../../framework/basePage");
const PreviewForm = require("../../framework/commonElements/previewForm");
const Button = require("../../framework/commonElements/button");

class PreviewFormOnNewslettersPage extends BasePage {
  constructor() {
    super(
      new PreviewForm(
        "//div[contains(@id, 'today_previews')]",
        "Euronews preview form"
      )
    );
    this.euronewsPreviewForm = this.uniqueElement;
    this.closeButtonOnPreviewForm = new Button(
      "//a[contains(@href, '#close')]",
      "Close preview form button"
    );
  }

  async waitForEuronewsPreviewFormToBeNotDisplayed() {
    await this.euronewsPreviewForm.waitForElementToBeNotDisplayed();
  }

  async clickOnPreviewCloseButton() {
    await this.closeButtonOnPreviewForm.click();
  }
}

module.exports = new PreviewFormOnNewslettersPage();
