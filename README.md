# Selenium E2E Automation Testing - Bootcamp Edition

Automated E2E testing project using **Selenium WebDriver**, **Mocha**, and **Visual Regression Testing** with [SauceDemo](https://www.saucedemo.com) as the target application.

## Tech Stack

- **Selenium WebDriver** - Browser automation
- **Mocha** - Test framework
- **Pixelmatch** - Image comparison for visual regression
- **Canvas** - Image processing

## Project Structure

```
selenium-skola/
├── config/
│   └── env.js              # Credentials & environment config
├── tests/
│   ├── locators/            # Element selectors (CSS, XPath)
│   │   ├── loginPage.locator.js
│   │   ├── productsPage.locator.js
│   │   └── cartPage.locator.js
│   ├── pages/               # Page Object classes
│   │   ├── loginPage.js
│   │   ├── productsPage.js
│   │   ├── cartPage.js
│   │   └── screenshotPage.js
│   ├── specs/               # Test specifications
│   │   ├── login.spec.js
│   │   ├── products.spec.js
│   │   └── cart.spec.js
│   └── utilities/
│       └── visualRegressionHelper.js
├── utilities/               # Helper utilities
├── screenshot/             # Generated screenshots (gitignored)
├── visual-baseline/         # Baseline images (gitignored)
├── visual-current/          # Current screenshots (gitignored)
├── visual-diff/             # Diff images (gitignored)
├── .gitignore
├── package.json
└── README.md
```

## Installation

```bash
npm install
```

## Credentials

Credentials are stored in `config/env.js`:

```javascript
users: {
  valid: {
    username: 'standard_user',
    password: 'secret_sauce'
  }
}
```

## Running Tests

```bash
# Run all tests
npx mocha tests/specs/*.spec.js --timeout 60000

# Run specific test file
npx mocha tests/specs/login.spec.js --timeout 60000
```

## Test Scenarios

| ID | Scenario | Description |
|----|----------|-------------|
| TC-01 | Login Success | Login with valid credentials |
| TC-05 | Products Display | Verify 6 products are displayed |
| TC-10 | Cart Add Items | Add 3 items to cart |

## Visual Regression Testing

Screenshot is taken on each test and compared with baseline:

```
visual-baseline/  → Reference images (the "correct" standard)
visual-current/   → New screenshots from each run
visual-diff/      → Pixel-by-pixel differences (highlighted in red)
```

### Clean Visual Folders

```bash
rm -rf visual-baseline visual-current visual-diff
```

## Page Object Model Pattern

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    Spec     │ ──► │    Page     │ ──► │  Locator   │
│   (Test)    │     │   Object    │     │  (By.css)  │
└─────────────┘    └─────────────┘    └─────────────┘
```

## Troubleshooting

### Click not working?
```javascript
await this.driver.executeScript('arguments[0].click();', element);
```

### Element not found?
```javascript
await this.driver.wait(async () => {
  const elements = await this.driver.findElements(selector);
  return elements.length > 0;
}, 5000);
```

## License

ISC
