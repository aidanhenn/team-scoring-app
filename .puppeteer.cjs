module.exports = {
    chrome: {
      skipDownload: process.env.NODE_ENV === "production",  // Skip download in production
    },
    cacheDirectory: join(__dirname, ".cache", "puppeteer"),
  };
  