const express = require('express');

const connect = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

const TweetService = require('./services/tweet-service');

app.listen(PORT, async () => {
    console.log('Server started on port ' + PORT);
    await connect();
    console.log('MongoDB connected');

    const tweet = await new TweetService().create({
        content: 'is #tweets working?'
    });
    console.log(tweet);
});