const logger = require("../utils/logger");

class StringUtils {
  static getRandomCharFrom(str) {
    return str[Math.floor(Math.random() * str.length)];
  }

  static generateRandomString(length) {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += this.getRandomCharFrom(characters);
    }
    return result;
  }

  static generateRandomEmail(usernameLength, domainLength) {
    const username = this.generateRandomString(usernameLength);
    const domain = this.generateRandomString(domainLength);
    const email = `${username}@${domain}.com`;
    return email;
  }

  static generatePassword(length) {
    if (length < 8) {
      const errorMessage = "The password length should be more than 8";
      logger.error(errorMessage);
    }
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+{}:\"<>?~\\-=[];',.";

    let password =
      this.getRandomCharFrom(upperChars) +
      this.getRandomCharFrom(lowerChars) +
      this.getRandomCharFrom(numbers) +
      this.getRandomCharFrom(specialChars);

    const allChars = upperChars + lowerChars + numbers + specialChars;
    for (let i = 4; i < length; i++) {
      password += this.getRandomCharFrom(allChars);
    }

    return password;
  }
}

module.exports = StringUtils;
