const puppeteer = require('puppeteer');

let url = 'https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-bebidas-bebidas-sin-alcohol/_/N-j9f2pv';


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let data = []
    await page.goto(url);
    const nextPages = await page.evaluate(() => (Array.from(document.querySelectorAll(".atg_store_pagination a")).map((imagen) => imagen.href)));

    // nextPages.forEach((pagina) => (console.log(pagina)));

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

    let len = desc.length;

    for (var x = 0; x < len; x++) {
        var element = {
            "sku": sku[x],
            "product": desc[x],
            "price": price[x]
        };
        data.push(element);
    }
    console.log(JSON.stringify(data));
    console.log(len);
    console.log(nextPages)
    parseJSONToCSVStr(data);
    await browser.close();
})();


function parseJSONToCSVStr(jsonData) {
    if (jsonData.length == 0) {
        return '';
    }

    let keys = Object.keys(jsonData[0]);

    let columnDelimiter = ',';
    let lineDelimiter = '\n';

    let csvColumnHeader = keys.join(columnDelimiter);
    let csvStr = csvColumnHeader + lineDelimiter;

    jsonData.forEach(item => {
        keys.forEach((key, index) => {
            if ((index > 0) && (index < keys.length - 1)) {
                csvStr += columnDelimiter;
            }
            csvStr += item[key];
        });
        csvStr += lineDelimiter;
    });

    return encodeURIComponent(csvStr);;
}