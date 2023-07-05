const AboutPage = require("../pageobjects/about.page");
const MainPage = require("../pageobjects/main.page");
const config = require("../pageobjects/config");
const { expect } = require("chai");
const logger = require("../pageobjects/logger");

describe("Players number comparison", () => {
  before(async () => {
    logger.info("Test case starts: Players number comparison");
    await browser.url(config.get("MainPageUrlEng"));
  });

  after(async () => {
    logger.info("Test case ends: Players number comparison");
    await browser.url(config.get("MainPageUrlEng"));
  });

  afterEach(function () {
    if (this.currentTest.state === "failed") {
      logger.error(`Test failed: ${this.currentTest.title}`);
    }
  });

  it("About page opening", async () => {
    await MainPage.about.click();
    browser.waitUntil(async () => {
      return (await browser.getUrl()) === config.get("AboutPageUrl");
    });
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.equal(config.get("AboutPageUrl"));
  });

  it("Players comparison", async () => {
    expect(await AboutPage.comparePlayers()).to.equal(true);
  });
});
