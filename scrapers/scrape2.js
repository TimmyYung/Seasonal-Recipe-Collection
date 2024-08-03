const puppeteer = require('puppeteer');
const fs = require('fs');

const input = JSON.parse(fs.readFileSync('data.json', 'utf8'));

(async () => {
    console.log('Starting the web scraper...');
    
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const results = {};

    const totalCombinations = input.fruits.length * input.countries.length;
    let completedCombinations = 0;

    // Define a concurrency limit
    const CONCURRENCY_LIMIT = 500;
    const promises = [];
    
    const extractData = async (fruit, country) => {
        const page = await browser.newPage();
        let url; 
        try {
            url = `https://www.seasonalfoodguide.org/veg/${fruit}/${country}`;
            console.log(`Navigating to ${url} (${++completedCombinations}/${totalCombinations})...`);

            // Set navigation timeout (e.g., 60 seconds)
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 600000 });

            // Extract the second <p> element with class "card-content"
            console.log(`Extracting data from ${url}...`);
            const paragraphs = await page.evaluate(() => {
                const elements = Array.from(document.querySelectorAll('p.card-content'));
                return elements.length > 1 ? elements[1].textContent.trim() : '';
            });

            // Convert the paragraphs string to an array of months
            const months = paragraphs.split(',').map(month => month.trim()).filter(month => month.length > 0);

            if (!results[country]) {
                results[country] = {};
            }
            results[country][fruit] = months;

            console.log(`Data extracted for ${url}`);
        } catch (error) {
            console.error(`Error extracting data from ${url}:`, error); // `url` is now accessible here
            if (!results[country]) {
                results[country] = {};
            }
            results[country][fruit] = [];
        } finally {
            await page.close();
        }
    };

    for (const country of input.countries) {
        for (const fruit of input.fruits) {
            if (promises.length >= CONCURRENCY_LIMIT) {
                await Promise.all(promises.splice(0, CONCURRENCY_LIMIT));
            }
            promises.push(extractData(fruit, country));
        }
    }

    await Promise.all(promises);

    console.log('Saving data to US_Seasonal.json...');
    fs.writeFileSync('US_Seasonal.json', JSON.stringify(results, null, 4), 'utf8');
    console.log('Data has been saved to US_Seasonal.json');

    console.log('Closing the browser...');
    await browser.close();
    
    console.log('Web scraping completed.');
})();
