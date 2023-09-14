const logger = require("../utils/logger");

class ArrayUtils {
  static selectRandomValueFromArray(array) {
    if (!array || array.length === 0) {
      const errorMessage = "The provided array is either undefined or empty.";
      logger.error(errorMessage);
    } else {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }
  }

  static getRandomElementFromArrayExcluding(array, excludedElement) {
    const filteredArray = array.filter(
      (element) => element !== excludedElement
    );
    if (filteredArray.length > 0) {
      return this.selectRandomValueFromArray(filteredArray);
    } else {
      const errorMessage = "The filtered array is either undefined or empty.";
      logger.error(errorMessage);
    }
  }
}

module.exports = ArrayUtils;
