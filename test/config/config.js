module.exports = {
  get: (key) => {
    if (key === "HomePageUrl") {
      return "https://userinyerface.com/";
    }
  },

  predefinedValues: {
    password: "P@ssw0rd_эxample",
    email: "john.doe",
    domainName: "example",
    domainDropdownIndex: "1",
    firstInterestIndex: "1",
    secondInterestIndex: "2",
    thirdInterestIndex: "3",
    timerData: "00:00:00",
  },

  validationTextProperties: {
    color: "rgba(41,197,102,1)",
    text: "Please upload a picture",
  },
};
