const puppeteer = require('puppeteer');
const fs = require('fs');

let url = 'https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-bebidas-bebidas-sin-alcohol/_/N-j9f2pv';


(async () => {
    const getProducts = async (url) => {
        let data = [];
        const page = await browser.newPage();
        await page.goto(url);
        // get desc product on the page
        const desc = await page.evaluate(() => (Array.from(document.querySelectorAll(".descrip_full")).map((producto) => producto.innerText)));
        // get sku
        const sku = await page.evaluate(() => (Array.from(document.querySelectorAll(".descrip_full")).map((producto) => producto.id.split('_')[2].replace('sku', ''))));
        // get prices
        const price = await page.evaluate(() => (Array.from(document.querySelectorAll(".unit")).map((precio) => precio.innerText.split("$")[1])));
        for (var x = 0; x < desc.length; x++) {
            var element = {
                "sku": sku[x],
                "product": desc[x],
                "price": price[x]
            };
            data.push(element);
        }

        const nextUrl = await page.evaluate(() => {
            return document.querySelector("#atg_store_pagination > li:nth-child(2) > a").href
        });


        console.log(nextUrl);
        return data;

    }
    const browser = await puppeteer.launch();
    // document.querySelector("#atg_store_pagination > li:nth-child(3) > a")
    // document.querySelector("#atg_store_pagination > li:nth-child(22) > a").href
    await getProducts(url);


    // const nextPages = await page.evaluate(() => (Array.from(document.querySelectorAll(".atg_store_pagination a")).map((imagen) => imagen.href)));

    // nextPages.forEach((pagina) => (console.log(pagina)));

    // Get the "viewport" of the page, as reported by the page.
    // await page.goto('https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-almac%C3%A9n-golosinas-alfajores/_/N-1njwjm5');

    // image
    // Array.from(document.querySelectorAll("div.leftList > div > a > span.atg_store_productImage > img")).map((imagen) => imagen.src)

    // let len = desc.length;
    // console.log(price.length, sku.length, desc.length)

    // console.log(JSON.stringify(data));
    // fs.writeFileSync('precios.json', JSON.stringify(data));
    // console.log(len);
    // console.log(nextPages)
    await browser.close();
})();


// let data = JSON.stringify(student);
// fs.writeFileSync('student-2.json', JSON.stringify(data));
//*[@id="atg_store_pagination"]/li[16]/a
//*[@id="atg_store_pagination"]/li[21]/a
// https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-bebidas-bebidas-sin-alcohol/_/N-j9f2pv?Nf=product.endDate%7CGTEQ+1.5952896E12%7C%7Cproduct.startDate%7CLTEQ+1.5952896E12&No=48&Nr=AND%28product.language%3Aespa%C3%B1ol%2Cproduct.sDisp_200%3A1004%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=24
// https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-bebidas-bebidas-sin-alcohol/_/N-j9f2pv?Nf=product.endDate%7CGTEQ+1.5952896E12%7C%7Cproduct.startDate%7CLTEQ+1.5952896E12&No=24&Nr=AND%28product.sDisp_200%3A1004%2Cproduct.language%3Aespa%C3%B1ol%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=24
// https://www.cotodigital3.com.ar/sitios/cdigi/browse/catalogo-bebidas-bebidas-sin-alcohol/_/N-j9f2pv?Nf=product.endDate%7CGTEQ+1.5952896E12%7C%7Cproduct.startDate%7CLTEQ+1.5952896E12&No=552&Nr=AND%28product.language%3Aespa%C3%B1ol%2Cproduct.sDisp_200%3A1004%2COR%28product.siteId%3ACotoDigital%29%29&Nrpp=24
// https://www.cotodigital3.com.ar/siti