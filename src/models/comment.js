const mongoose = require('mongoose');

const commentScema = new mongoose.Schema({
    content:
        {
            type: String,
            required: true
        }
});

const Comment = mongoose.model('Comment', commentScema);

module.exports = Comment;