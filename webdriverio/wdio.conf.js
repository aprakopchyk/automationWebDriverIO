exports.config = {
  runner: "local",
  specs: ["./test/specs/**/*.js"],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      browserName: process.env.BROWSER || "chrome",
      "goog:chromeOptions": {
        args: ["--incognito"],
      },
    },
  ],
  logLevel: "info",
  bail: 0,
  baseUrl: "http://localhost",
  waitforTimeout: 5000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ["chromedriver", "geckodriver"],
  framework: "mocha",
  reporters: [
    [
      "junit",
      {
        outputDir: "./junit_reports",
        outputFileFormat: function (options) {
          return `results-${options.cid}.xml`;
        },
      },
    ],
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
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
