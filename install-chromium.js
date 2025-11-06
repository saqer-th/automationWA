import puppeteer from "puppeteer";

(async () => {
  const browserFetcher = puppeteer.createBrowserFetcher();
  const revisionInfo = await browserFetcher.download("131.0.6778.204"); // نفس الإصدار الظاهر بالخطأ
  console.log("✅ Chromium installed at:", revisionInfo.executablePath);
})();
