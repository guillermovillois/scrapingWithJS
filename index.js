const puppeteer = require('puppeteer');
const mongoose = require('mongoose');

let url = '';
const getItems = async (searchTerm) => {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();

    await page.goto(`https://facebook.com/marketplace/search/?query=${encodeURI(searchTerm)}`);

    const itemList = await page
        .waitForSelector('div > div > span > div >div > a[role="link"] > div')
        .then(() => page.evaluate(() => {
            const itemArray = [];
            const itemNodeList = document.querySelectorAll(
                'div > div > span > div >div > a[role="link"]'
            );
            const itemNodeList2 = document.querySelectorAll(
                'div > div > span > div >div > a[role="link"]'
            );

            itemNodeList.forEach(item => {
                const itemTitle = item.innerText.split('\n').slice(1,).join(' ');
                const itemPrice = item.innerText.split('\n')[0];
                const itemURL = `https://facebook.com${item.getAttribute('href')}`;
                const itemImg = item
                    .querySelector('img')
                    .getAttribute('src');
                itemArray.push({ itemTitle, itemPrice, itemURL, itemImg })
            })
            return itemArray
        }))
        .catch(() => console.log('Selector Error!'));

    console.log(itemList);
    browser.close();
}

getItems('silla');