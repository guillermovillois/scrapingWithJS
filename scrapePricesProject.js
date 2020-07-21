const puppeteer = require('puppeteer');

let url = 'https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-almac%C3%A9n-golosinas-alfajores/_/N-1njwjm5';


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Get the "viewport" of the page, as reported by the page.
    // await page.goto('https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-almac%C3%A9n-golosinas-alfajores/_/N-1njwjm5');

    // get desc product on the page
    const desc = await page.evaluate(() => (Array.from(document.querySelectorAll(".descrip_full")).map((producto) => producto.innerText)));
    // get sku
    const sku = await page.evaluate(() => (Array.from(document.querySelectorAll(".descrip_full")).map((producto) => producto.id.split('_')[2].replace('sku', ''))));
    // get prices
    const price = await page.evaluate(() => (Array.from(document.querySelectorAll(".info_discount .atg_store_newPrice")).map((precio) => precio.innerText.split("$")[1])));
    // image
    // Array.from(document.querySelectorAll("div.leftList > div > a > span.atg_store_productImage > img")).map((imagen) => imagen.src)
    console.log(desc, sku, price)

    await browser.close();
})();