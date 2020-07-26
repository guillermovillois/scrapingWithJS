const puppeteer = require('puppeteer');
const mongoose = require('mongoose');

const itemSchema = require('./models/itemsSchema')
const AddtoDB = item => {
    const { itemTitle, itemPrice, itemURL, itemImg } = item;
    return itemSchema.findOne({ itemTitle, itemPrice, itemURL })
        .then((doc) => {
            if (doc) return `${itemTitle} is already in database`;
            if (!doc) {
                const NewItem = new itemSchema();
                NewItem.itemTitle = itemTitle;
                NewItem.itemPrice = itemPrice;
                NewItem.itemURL = itemURL;
                NewItem.itemImg = itemImg;
                NewItem.timeStamp = Date.now();
                return NewItem.save()
                    .then(() => 'Item added to database')
                    .catch(() => 'Database saving error');
            }
        })
        .catch(() => 'Database finding error');
};

const getItems = async (searchTerm) => {
    const browser = await puppeteer.launch({ headless: true });

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

    // console.log(itemList);
    return itemList;
    // browser.close();
}

const initScraper = async () => {
    const items = await getItems('silla');
    items.forEach(async item => {
        const DBMsg = await AddtoDB(item);
        console.log(DBMsg);
    })
    // console.log(items);
}

mongoose.connect('mongodb://localhost:27017/facebook-scraper', { useNewUrlParser: true, useUnifiedTopology: true },
    () =>
        console.log('Connected to Database:'))
initScraper();

