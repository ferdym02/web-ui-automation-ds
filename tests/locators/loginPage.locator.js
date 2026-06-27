const { By } = require("selenium-webdriver");

const LOGIN_LOCATORS = {
  url: "https://www.saucedemo.com/",

  selectors: {
    usernameInput: By.id("user-name"),
    passwordInput: By.id("password"),
    loginButton: By.id("login-button"),
    errorMessage: By.css('[data-test="error"]'),
    title: By.css(".title"),
  },
};

module.exports = LOGIN_LOCATORS;
zxXzz;
