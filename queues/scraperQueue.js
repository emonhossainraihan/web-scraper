const Queue = require("bull");
const cheerio = require("cheerio");
const rp = require("request-promise");
const models = require("../models");
const scraperQueue = new Queue("web scraping");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

scraperQueue.process(async (job, done) => {
    console.log('queue add data: ', job.data)
    // extract deal sent from route/deals
    const deal = job.data.deal;
    const response = await rp(deal.url);
    const $ = cheerio.load(response);
    const items = $(".list_item");
    let deals = [];
    await sleep(10000);
    Object.keys(items).forEach(key => {
        const dealer = $(items[key])
            .find(".offer_dealer")
            .text();
        const title = $(items[key])
            .find(".offer_title")
            .text();
        let link = $(items[key])
            .find(".offer_title a")
            .attr("href");
        link = `https://www.redflagdeals.com${link}`;
        deals.push({ dealer, title, link });
    });

    await models.Deal.update(
        {
            content: JSON.stringify(deals),
        },
        {
            where: {
                id: deal.id,
            },
        }
    );
    done();
});

export { scraperQueue };