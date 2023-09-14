const timeouts = require("../constants/timeouts");

module.exports.config = {
  elementLoad: timeouts.element,
  testTimeout: timeouts.testTime,
  pageLoad: timeouts.pageLoad,
};
