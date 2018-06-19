const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 3307;
const htmlRouter = require('./routes/htmlRoutes.js');
const apiRouter = require('./routes/apiRoutes.js');
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/', htmlRouter);
app.use('/api', apiRouter);

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)
.catch(err => console.log(err));

app.listen(PORT, function() {
    console.log("App running on http://localhost:" + PORT);
});