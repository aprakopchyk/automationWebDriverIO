module.exports = {
  get: (key) => {
    if (key === "BaseURL") {
      return "https://userinyerface.com/";
    }
  },

  testDataValues: {
    timerData: "00:00:00",
    color: "rgba(41,197,102,1)",
    text: "Please upload a picture",
    distanceForElementToBeHidden: "50",
  },
};
