const {By} = require('selenium-webdriver');

const PRODUCTS_LOCATORS = {
  url: 'https://www.saucedemo.com/inventory.html',

  selectors: {
    // Product list
    productItems: By.css('.inventory_item'),

    // Product details
    productName: (index) => By.css(`.inventory_item:nth-child(${index}) .inventory_item_name`),
    productPrice: (index) => By.css(`.inventory_item:nth-child(${index}) .inventory_item_price`),

    // Add to cart button
    addToCartButton: (index) => By.css(`.inventory_item:nth-child(${index}) button.btn_inventory`),

    // Cart
    cartBadge: By.css('.shopping_cart_badge'),
    cartLink: By.css('.shopping_cart_link'),

    // Sort dropdown
    sortDropdown: By.css('.product_sort_container'),
    sortOption: (value) => By.css(`.product_sort_container option[value="${value}"]`),

    // Page title
    title: By.css('.title'),
  }
};

module.exports = PRODUCTS_LOCATORS;
