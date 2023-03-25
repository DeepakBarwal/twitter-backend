import mongoose from 'mongoose';

const commentScema = new mongoose.Schema({
    content:
        {
            type: String,
            required: true
        }
});

const Comment = mongoose.model('Comment', commentScema);

export default Comment;