class UniversalUtils {
  static async generateEmail() {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const emailName = Array.from({ length: 8 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
    return `${emailName}`;
  }

  static async generatePassword(email) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const cyrillicChars = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
    const emailLetter = email.charAt(Math.floor(Math.random() * email.length));

    const passwordChars = Array.from({ length: 7 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
    const passwordNumber = numbers.charAt(
      Math.floor(Math.random() * numbers.length)
    );
    const passwordCyrillic = cyrillicChars.charAt(
      Math.floor(Math.random() * cyrillicChars.length)
    );

    return (
      passwordChars.charAt(0).toUpperCase() +
      passwordChars.slice(1) +
      emailLetter +
      passwordNumber +
      passwordCyrillic
    );
  }

  static async generateDomainName() {
    const domains = [
      "google",
      "yandex",
      "microsoft",
      "apple",
      "amazon",
      "facebook",
    ];
    return domains[Math.floor(Math.random() * domains.length)];
  }

  static async getElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

module.exports = UniversalUtils;
