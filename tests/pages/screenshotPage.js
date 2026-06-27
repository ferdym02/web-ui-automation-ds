const path = require('path');
const fs = require('fs');
const VisualRegressionHelper = require('../../utilities/visualRegressionHelper');

class ScreenshotPage {
  constructor(driver) {
    this.driver = driver;
    this.screenshotDir = path.join(process.cwd(), 'screenshot');
    this.visualRegression = new VisualRegressionHelper();
  }

  async takeAndCompareFullScreenshot(filename) {
    this._ensureDir(this.screenshotDir);

    const screenshotPath = path.join(this.screenshotDir, filename);
    const screenshot = await this.driver.takeScreenshot();
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    console.log(`Screenshot saved: ${screenshotPath}`);

    // Auto-sync to visual-current for visual regression
    this.visualRegression.saveCurrentScreenshot(screenshotPath, filename);

    // Check if baseline exists
    if (this.visualRegression.hasBaseline(filename)) {
      const result = await this.visualRegression.compareImages(filename);
      return {
        action: 'compare',
        filename,
        ...result
      };
    } else {
      // Save as baseline
      this.visualRegression.saveAsBaseline(filename);
      return {
        action: 'baseline_created',
        filename,
        hasBaseline: false,
        match: null,
        matchPercentage: 0
      };
    }
  }

  _ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
}

module.exports = ScreenshotPage;
