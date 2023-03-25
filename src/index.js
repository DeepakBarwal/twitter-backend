import express from 'express';

import {connect} from './config/database.js';

const app = express();
const PORT = process.env.PORT || 3000;

import TweetService from './services/tweet-service.js';

app.listen(PORT, async () => {
    console.log('Server started on port ' + PORT);
    await connect();
    console.log('MongoDB connected');

    const tweet = await new TweetService().create({
        content: 'is #tweets working?'
    });
    console.log(tweet);
});