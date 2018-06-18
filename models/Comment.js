const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        default: "Anonymous"
    }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;