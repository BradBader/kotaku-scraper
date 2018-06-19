const db = require('../models/index.js');
const request = require('request');
const cheerio = require('cheerio');

const router = require('express').Router();

router.get('/scrape', (req, res)=>{
    request('https://kotaku.com', (error, response, body)=>{
        if (error) return console.log(error);
        const $ = cheerio.load(body);
        let results = [];
        /*
        $('a.js_entry-link').each((index, element)=>{
            if(index == 0 || index % 2 == 0) {
                let title = $(element).text();
                if (title.length == 0) title = 'untitled';
                results.push({
                    title: title,
                    link: $(element).attr('href')
                });
            }
        });
        db.Article.insertMany(results, {ordered: false, rawResult: false}, (err, docs) => {
            res.json({errors: err, result: docs});
        });
        */
        $('article').each((index, element)=>{
            let title;
            $('a.js_entry-link', element).each((index2, element2)=>{
                if(index2 == 0) title = $(element2).text();
            });
            if(title.length == 0) {
                title = $('p', element).text();
            }
            let link = $('a.js_entry-link', element).attr("href");
            results.push({
                title: title,
                link: link
            });
        });
        db.Article.insertMany(results.reverse(), {ordered: false, rawResult: false}, (err, docs) => {
            res.json({errors: err, results: docs});
        });
    });
});

module.exports = router;