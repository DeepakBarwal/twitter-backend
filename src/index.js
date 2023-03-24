const express = require('express');

const connect = require('./config/database');
const TweetRepository = require('./repositories/tweet-repository');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log('Server started on port ' + PORT);
    await connect();
    
    const repo = new TweetRepository();
    const tweets = await repo.getAll(0,2);
    console.log(tweets[0].contentWithEmail);
    const tweet = await repo.create({content: 'yo'});
    console.log(tweet);
});