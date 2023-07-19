class UniversalUtils {
  static async getFirstNResults(locator, n) {
    const results = await $$(locator);
    const firstNResults = results.slice(0, n);
    let firstNResultsText = [];
    for (let result of firstNResults) {
      firstNResultsText.push(await result.getText());
    }
    return firstNResultsText;
  }
  static async scrollToElement(element) {
    await browser.execute((el) => {
      el.scrollIntoView();
    }, element);
  }
  static async waitForElementAndClick(element) {
    await element.waitForDisplayed();
    await element.click();
  }
  static async deleteAndWaitForElement(element) {
    await element.click();
    await element.waitForDisplayed({
      reverse: true,
    });
  }
}

module.exports = UniversalUtils;
