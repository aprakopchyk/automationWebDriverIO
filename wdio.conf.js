const timeout = require("../test_task/test/framework/constants/timeouts");

exports.config = {
  runner: "local",
  specs: ["./test/app/specs/testSuite.js"],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["--incognito"],
      },
    },
  ],
  services: ["chromedriver"],
  logLevel: "info",
  reporters: ["spec", ["allure", { outputDir: "allure-results" }]],
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: timeout.testTime,
  },
  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },
};
