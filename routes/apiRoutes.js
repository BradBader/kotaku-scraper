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
            let data = {};
            $('a.js_entry-link', element).each((index2, element2)=>{
                if(index2 == 0) data.title = $(element2).text();
            });
            if(data.title.length == 0) {
                data.title = $('p', element).text();
            } else {
                data.desc = $('p', element).text();                
            }
            data.link = $('a.js_entry-link', element).attr("href");
            results.push(data);
        });
        db.Article.insertMany(results.reverse(), {ordered: false, rawResult: false}, (err, docs) => {
            res.json({errors: err, results: docs});
        });
    });
});

router.get('/', (req, res) => {
    db.Article.find()
    .populate('comments')
    .sort({_id: -1})
    .then( (results) => {
        //res.json(results);
        res.json( {results: results} );
    })
    .catch( (err) => res.json(err) );
});

router.post('/commentOn/:articleId', (req, res) => {
    let articleId = req.params.articleId;
    db.Comment.create(req.body)
    .then(newComment => {
        return db.Article.findOneAndUpdate({_id: articleId}, {$push: {comments: newComment._id} }, {new: true});
    })
    .then(updatedArticle => res.json(updatedArticle))
    .catch(err => res.json(err));
});

router.post('/pins/:articleId', (req, res) => {
    let articleId = req.params.articleId;
    db.Article.findOneAndUpdate({_id: articleId}, { $set: {pinned: req.body.pin} }, {new: true})
    .then(updatedArticle => res.json(updatedArticle))
    .catch(err => res.json(err));
});

module.exports = router;