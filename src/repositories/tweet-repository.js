import Tweet from '../models/tweet.js';
import CrudRepository from './crud-repository.js';

class TweetRepository extends CrudRepository {

    constructor() {
        super(Tweet);
    }

    async getWithComments(id) {
        try {
            const tweet = await Tweet.findById(id).populate({path: 'comments'}).lean();
            return tweet;
        } catch (error) {
            console.error(error);
        }
    }

    async getAll(offset, limit) {
        try {
            const tweets = await Tweet.find().skip(offset).limit(limit);
            return tweets;
        } catch (error) {
            console.error(error);
        }
    }

    async find(id) {
        try {
            const tweet = Tweet.findById(id).populate({path:'likes'});
            return tweet;
        } catch (error) {
            console.error('Something went wrong in CRUD repo: ' + error);
            throw error;
        }
    }
}

export default TweetRepository;