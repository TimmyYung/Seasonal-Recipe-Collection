// Web scraper to find all fruits/vegs and countries listed on https://www.seasonalfoodguide.org/

const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // URL of the website
    const url = 'https://www.seasonalfoodguide.org/';

    await page.goto(url, { waitUntil: 'networkidle2' });

    // Extract all <h3> elements with class "card_title"
    const fruits = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('h3.card_title'));
        return elements.map(element => element.textContent.trim());
    });

    // Extract all <option> elements inside <select> with class "browser-default"
    const countries = await page.evaluate(() => {
        const selectElement = document.querySelector('select.browser-default');
        if (!selectElement) return [];
        const optionElements = Array.from(selectElement.querySelectorAll('option'));
        return optionElements.map(option => option.textContent.trim());
    });

    const result = { fruits, countries };

    fs.writeFileSync('data.json', JSON.stringify(result, null, 4), 'utf8');

    console.log('Data has been saved to data.json');

    await browser.close();
})();
