class StringUtils {
  static async extractNumberFromText(text, index) {
    return parseInt(text.split("\n")[index].replace(/,/g, ""), 10);
  }
}

module.exports = StringUtils;
