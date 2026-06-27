const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const ProductsPage = require("../pages/productsPage");
const ScreenshotPage = require("../pages/screenshotPage");
const ENV = require("../../config/env");

describe("SauceDemo Login Tests", function () {
  this.timeout(60000);

  beforeEach(async function () {
    this.driver = await new Builder().forBrowser("chrome").build();

    this.loginPage = new LoginPage(this.driver);
    this.productsPage = new ProductsPage(this.driver);
    this.screenshotPage = new ScreenshotPage(this.driver);
  });

  afterEach(async function () {
    if (this.driver) {
      await this.driver.quit();
    }
  });

  it("TC-01: Login Success", async function () {
    const { loginPage, productsPage, screenshotPage } = this;
    const { username, password } = ENV.users.valid;

    await loginPage.open();
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    await loginPage.clickLoginButton();
    await this.driver.sleep(500);

    const title = await productsPage.getTitle();
    if (title !== ENV.expected.loginSuccessTitle) {
      throw new Error(
        `Expected "${ENV.expected.loginSuccessTitle}" but got "${title}"`,
      );
    }

    await screenshotPage.takeAndCompareFullScreenshot("tc01_login_success.png");
    console.log("TC-01 PASSED: Login Success");
  });

  it("TC-02: Login Invalid Username", async function () {
    const { loginPage, screenshotPage } = this;
    const { username, password } = ENV.users.invalid;

    await loginPage.open();

    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    await loginPage.clickLoginButton();
    await this.driver.sleep(500);

    const errorMessage = await loginPage.getErrorMessage();

    if (errorMessage !== ENV.expected.loginFailedMessage) {
      throw new Error(
        `Expected "${ENV.expected.loginFailedMessage}" but got "${errorMessage}"`,
      );
    }

    await screenshotPage.takeAndCompareFullScreenshot(
      "tc02_invalid_username.png",
    );

    console.log("TC-02 PASSED: Login Invalid Username");
  });
});
