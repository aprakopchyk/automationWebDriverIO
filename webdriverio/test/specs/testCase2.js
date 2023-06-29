const ActionPage = require("../pageobjects/action.page");
const MainPage = require("../pageobjects/main.page");
const config = require("../pageobjects/config");
const { expect } = require("chai");

describe("Проверка фильтров страницы Экшен", () => {
  before(async () => {
    await browser.setWindowSize(1920, 1080);
    await browser.url(config.get("MainPageUrlEng"));
    await MainPage.language.click();
    await MainPage.russianLanguage.click();
    await browser.waitUntil(
      async () => {
        return (await browser.getUrl()) === config.get("MainPageUrl") + "?";
      },
      {
        timeout: 10000,
      }
    );
  });

  it("Проверка перехода на главную страницу", async () => {
    await MainPage.store.moveTo();
    await MainPage.storeMain.waitForDisplayed();
    await MainPage.storeMain.click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.equal(config.get("MainPageUrl"));
  });

  it("Проверка работы фильтров", async () => {
    await MainPage.action.click();
    await browser.waitUntil(async () => {
      return (await browser.getUrl()) === config.get("ActionPageUrl");
    });

    await browser.pause(3000);

    await browser.execute(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    expect(await ActionPage.filtersSelection()).to.be.true;
  });

  it("Получение данных игры", async () => {
    await ActionPage.gameName.getText();
    await ActionPage.gameReleaseDate.getText();
    await ActionPage.gamePrice.getText();
  });

  it("Проверка правильности данных", async () => {
    const yOffset = 1000;
    await browser.execute((offset) => {
      window.scrollTo({
        top: window.pageYOffset - offset,
        behavior: "smooth",
      });
    }, yOffset);

    await browser.pause(3000);

    await ActionPage.gameName.moveTo();
    await ActionPage.gameName.click();
    const windows = await browser.getWindowHandles();
    await browser.switchToWindow(windows[1]);
    await browser.waitUntil(() => windows.length > 1, {
      timeout: 5000,
    });
    const gameDataNextPage = await ActionPage.gameDataNextPage();
    await browser.switchToWindow(windows[0]);
    await browser.pause(3000);
    const gameData = await ActionPage.gameData();

    expect(gameDataNextPage).to.deep.equal(gameData);
  });
});
