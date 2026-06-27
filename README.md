# Selenium Automation Testing - SauceDemo Login

Automation testing project using **Selenium WebDriver**, **Mocha**, and **Page Object Model (POM)** with **Visual Regression Testing** on the SauceDemo website.

## Tech Stack

* Selenium WebDriver
* Mocha
* Pixelmatch
* Canvas

## Project Structure

```text
selenium-skola/
├── config/
│   └── env.js
├── tests/
│   ├── locators/
│   │   ├── loginPage.locator.js
│   │   └── productsPage.locator.js
│   ├── pages/
│   │   ├── loginPage.js
│   │   ├── productsPage.js
│   │   └── screenshotPage.js
│   ├── specs/
│   │   └── login.spec.js
│   └── utilities/
│       └── visualRegressionHelper.js
├── screenshot/
├── visual-baseline/
├── visual-current/
├── visual-diff/
├── package.json
└── README.md
```

## Installation

Install project dependencies:

```bash
npm install
```

## Running Test

Run the login automation test:

```bash
npx mocha tests/specs/login.spec.js --timeout 60000
```

## Test Scenarios

| Test Case | Description                                              |
| --------- | -------------------------------------------------------- |
| TC-01     | Login successfully using valid credentials               |
| TC-02     | Login with invalid username and verify the error message |

## Credentials

Credentials are configured in:

```text
config/env.js
```

Example:

```javascript
users: {
  valid: {
    username: "standard_user",
    password: "secret_sauce"
  },
  invalid: {
    username: "invalid_user",
    password: "secret_sauce"
  }
}
```

## Visual Regression

A screenshot is automatically captured after each test execution.

The screenshots are managed in the following folders:

```text
visual-baseline/   # Baseline images
visual-current/    # Current screenshots
visual-diff/       # Comparison result images
```

If a baseline image does not exist, it will be created automatically on the first execution. On subsequent executions, the current screenshot will be compared with the baseline image.

## Page Object Model (POM)

This project implements the Page Object Model design pattern.

```text
Spec
   │
   ▼
Page Object
   │
   ▼
Locator
```

This structure helps separate test logic from web element locators, making the project easier to maintain and extend.

## Expected Result

After running the test successfully:

```text
SauceDemo Login Tests

✔ TC-01: Login Success
✔ TC-02: Login Invalid Username

2 passing
```

## License

ISC
