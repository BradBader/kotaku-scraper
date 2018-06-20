const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        default: "No Title"
    },
    link: {
        type: String,
        unique: true
    },
    desc: {
        type: String,
        default: "No Description Available"
    },
    pinned: {
        type: Boolean,
        default: false
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;