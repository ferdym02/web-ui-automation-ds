const BROWSER = {
  // Browser yang digunakan untuk testing
  name: 'chrome',

  // Chrome options untuk headless/headed mode
  options: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1920,1080'
    ]
  },

  // Untuk headed mode (visible browser)
  headed: {
    headless: false,
    args: [
      '--window-size=1920,1080'
    ]
  }
};

module.exports = BROWSER;
