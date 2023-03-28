import express from 'express';

import {connect} from './config/database.js';
import apiRoutes from './routes/index.js';

import {TweetRepository, UserRepository} from './repositories/index.js';
import LikeService from './services/like-service.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);

app.listen(PORT, async () => {
    console.log('Server started on port ' + PORT);
    await connect();
    console.log('MongoDB connected');

    // const userRepo = new UserRepository();
    // const tweetRepo = new TweetRepository();
    // const tweets = await tweetRepo.getAll(0,10);
    // // const user = await userRepo.create({
    // //     email: 'yo@yo.com',
    // //     password: '123456',
    // //     name: 'Yoyo'
    // // });
    // const users = await userRepo.getAll();
    // const likeService = new LikeService();
    // await likeService.toggleLike(tweets[0].id, 'Tweet', users[0].id);
});