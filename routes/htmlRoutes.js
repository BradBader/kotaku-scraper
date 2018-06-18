const router = require('express').Router();
const db = require('../models/index.js');

router.get('/', (req, res) => {
    db.Article.find()
    .then( (results) => {
        //res.json(results);
        res.render('index', {results: results});
    })
    .catch( (err) => res.json(err) );
});

module.exports = router;