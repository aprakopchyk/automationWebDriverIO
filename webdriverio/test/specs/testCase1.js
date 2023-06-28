const AboutPage = require("../pageobjects/about.page");
const MainPage = require("../pageobjects/main.page");
const config = require("../pageobjects/config");
const { expect } = require("chai");

describe("Сравнение числа игроков", () => {
  before(async () => {
    await browser.url(config.get("MainPageUrlEng"));
  });

  after(async () => {
    await browser.url(config.get("MainPageUrlEng"));
  });

  it("Открытие страницы About", async () => {
    await MainPage.about.click();
    browser.waitUntil(async () => {
      return (await browser.getUrl()) === config.get("AboutPageUrl");
    });
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.equal(config.get("AboutPageUrl"));
  });

  it("Сравнение игроков", async () => {
    expect(await AboutPage.comparePlayers()).to.equal(true);
  });
});
