import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export async function getBrowser() {

  return await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });
}
