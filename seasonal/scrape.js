const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // URL of the website you want to scrape
    const url = 'https://www.seasonalfoodguide.org/'; // Replace with the actual URL

    // Navigate to the page
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Extract all <h3> elements with class "card_title"
    const cardTitles = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('h3.card_title'));
        return elements.map(element => element.textContent.trim());
    });

    // Create a result object
    const result = { cardTitles };

    // Write the result to a JSON file
    fs.writeFileSync('data.json', JSON.stringify(result, null, 4), 'utf8');

    console.log('Data has been saved to data.json');

    // Close the browser
    await browser.close();
})();
