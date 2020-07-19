const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty('src');
    const srcTxt = await src.jsonValue();

    console.log({ srcTxt });
}

scrapeProduct('https://www.amazon.com/-/es/Kenneth-Cole-Unlisted-Spread-Collar/dp/B0762T8PHJ?pf_rd_r=9Z0TGPEFZ15MVW6Z6ZY0&pf_rd_p=adfa95bc-7c76-466f-b7c8-6b42522d59e8&pd_rd_r=d83aa3eb-9389-49ab-aacc-49ec604c8d78&pd_rd_w=U9365&pd_rd_wg=dCKwB&ref_=pd_gw_unk')