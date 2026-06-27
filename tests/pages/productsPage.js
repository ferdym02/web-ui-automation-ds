const PRODUCTS_LOCATORS = require('../locators/productsPage.locator');

class ProductsPage {
  constructor(driver) {
    this.driver = driver;
  }

  async open() {
    await this.driver.get(PRODUCTS_LOCATORS.url);
  }

  async getTitle() {
    const titleElement = await this.driver.findElement(PRODUCTS_LOCATORS.selectors.title);
    return await titleElement.getText();
  }

  async getAllProducts() {
    const products = [];
    const items = await this.driver.findElements(PRODUCTS_LOCATORS.selectors.productItems);

    for (let i = 1; i <= items.length; i++) {
      const name = await this.driver.findElement(PRODUCTS_LOCATORS.selectors.productName(i)).getText();
      const price = await this.driver.findElement(PRODUCTS_LOCATORS.selectors.productPrice(i)).getText();
      products.push({ index: i, name, price });
    }

    return products;
  }

  async getProductCount() {
    const items = await this.driver.findElements(PRODUCTS_LOCATORS.selectors.productItems);
    return items.length;
  }

  async addProductToCart(index) {
    // Wait for product list to be ready
    await this.driver.wait(async () => {
      const items = await this.driver.findElements(PRODUCTS_LOCATORS.selectors.productItems);
      return items.length === 6;
    }, 5000);

    const button = await this.driver.findElement(PRODUCTS_LOCATORS.selectors.addToCartButton(index));

    // Use JavaScript click to ensure it works
    await this.driver.executeScript('arguments[0].click();', button);

    // Wait for cart badge to update
    await this.driver.sleep(500);

    const cartCount = await this.getCartBadgeCount();
    console.log(`Cart count after adding item ${index}: ${cartCount}`);
  }

  async getCartBadgeCount() {
    try {
      const badge = await this.driver.findElement(PRODUCTS_LOCATORS.selectors.cartBadge);
      const text = await badge.getText();
      return parseInt(text);
    } catch {
      return 0;
    }
  }

  async goToCart() {
    const cartLink = await this.driver.findElement(PRODUCTS_LOCATORS.selectors.cartLink);
    await cartLink.click();
  }
}

module.exports = ProductsPage;
