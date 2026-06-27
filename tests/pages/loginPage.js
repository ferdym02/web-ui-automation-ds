const { By } = require("selenium-webdriver");
const LOGIN_LOCATORS = require("../locators/loginPage.locator");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async open() {
    await this.driver.get(LOGIN_LOCATORS.url);
    await this.driver
      .wait(async () => {
        const url = await this.driver.getCurrentUrl();
        return url === LOGIN_LOCATORS.url;
      }, 5000)
      .catch(() => {});
  }

  async enterUsername(username) {
    const input = await this.driver.findElement(
      LOGIN_LOCATORS.selectors.usernameInput,
    );
    await input.sendKeys(username);
  }

  async enterPassword(password) {
    const input = await this.driver.findElement(
      LOGIN_LOCATORS.selectors.passwordInput,
    );
    await input.sendKeys(password);
  }

  async clickLoginButton() {
    const button = await this.driver.findElement(
      LOGIN_LOCATORS.selectors.loginButton,
    );
    await button.click();
  }

  async getErrorMessage() {
    try {
      const error = await this.driver.findElement(
        LOGIN_LOCATORS.selectors.errorMessage,
      );
      return await error.getText();
    } catch {
      return null;
    }
  }

  async clearSession() {
    await this.driver.manage().deleteAllCookies();
    await this.driver.get(LOGIN_LOCATORS.url);
    await this.driver.sleep(500);
  }
}

module.exports = LoginPage;
