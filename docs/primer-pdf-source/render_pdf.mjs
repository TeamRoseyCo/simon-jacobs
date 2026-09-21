import { chromium } from '/Users/hazemdweik/.npm/_npx/705bc6b22212b352/node_modules/playwright/index.mjs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const input = path.resolve(process.argv[2]);
const output = path.resolve(process.argv[3]);
const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const page = await browser.newPage();
await page.goto(pathToFileURL(input).href, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });

const options = {
  path: output,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<div></div>',
  footerTemplate: `<div style="width:100%;font-family:'Times New Roman',Times,serif;font-size:9pt;color:#000;padding:0 19mm;">
    <div style="display:flex;justify-content:space-between;border-top:0.5px solid #999;padding-top:4px;">
      <span style="font-style:italic;">The Adviser's Trade, Recut</span>
      <span class="pageNumber"></span>
    </div>
  </div>`,
  margin: { top: '16mm', bottom: '18mm', left: '19mm', right: '19mm' },
  tagged: true,
  outline: true,
};

await page.pdf(options);
await browser.close();
console.log(`wrote ${output}`);
