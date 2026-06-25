const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

describe("SauceDemo Automation Test", function () {
  let driver;

  before(async function () {
    const options = new chrome.Options();
    options.addArguments("--incognito");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  });

  after(async function () {
    await driver.quit();
  });

  it("SauceDemo Login dan Sorting", async function () {
    await driver.get("https://www.saucedemo.com");

    const title = await driver.getTitle();
    assert.strictEqual(title, "Swag Labs");

    // Login
    const inputUsername = await driver.findElement(
      By.css('[data-test="username"]'),
    );

    const inputPassword = await driver.findElement(
      By.xpath('//*[@data-test="password"]'),
    );

    const buttonLogin = await driver.findElement(
      By.className("submit-button btn_action"),
    );

    await inputUsername.sendKeys("standard_user");
    await inputPassword.sendKeys("secret_sauce");
    await buttonLogin.click();

    // Verifikasi login berhasil
    const buttonCart = await driver.wait(
      until.elementLocated(By.css('[data-test="shopping-cart-link"]')),
      10000,
    );

    await driver.wait(until.elementIsVisible(buttonCart), 5000);

    assert.strictEqual(await buttonCart.isDisplayed(), true);

    const textAppLogo = await driver.findElement(By.className("app_logo"));

    const logoText = await textAppLogo.getText();

    assert.strictEqual(logoText, "Swag Labs");

    // Sorting Z-A
    const dropdownSort = await driver.findElement(
      By.css('[data-test="product-sort-container"]'),
    );

    await dropdownSort.click();

    const option = await driver.findElement(
      By.xpath('//option[text()="Name (Z to A)"]'),
    );

    await option.click();
  });
});
