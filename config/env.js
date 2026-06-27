const ENV = {
  // Base URL for application under test
  baseUrl: "https://www.saucedemo.com/",

  // Test users for SauceDemo
  users: {
    valid: {
      username: "standard_user",
      password: "secret_sauce",
    },
    invalid: {
      username: "invalid_user",
      password: "secret_sauce",
    },
  },

  // Expected values for assertions
  expected: {
    loginSuccessTitle: "Products",
    loginFailedMessage:
      "Epic sadface: Username and password do not match any user in this service",
  },

  // Timeouts in milliseconds
  timeouts: {
    implicitWait: 10000,
    explicitWait: 5000,
    pageLoadTimeout: 30000,
  },
};

module.exports = ENV;
