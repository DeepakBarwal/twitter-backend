const express = require('express');

const connect = require('./config/database');
const TweetRepository = require('./repositories/tweet-repository');
const Comment = require('./models/comment');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log('Server started on port ' + PORT);
    await connect();
    
    const repo = new TweetRepository();
    const tweet = await repo.getWithComments('641bc9819f52c063d7de2667');
    console.log(tweet);
});