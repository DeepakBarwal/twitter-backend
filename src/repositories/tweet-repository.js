const Tweet = require('../models/tweet');

class TweetRepository {

    async create(data) {
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async get(id) {
        try {
            const tweet = await Tweet.findById(id);
            return tweet;
        } catch (error) {
            console.error(error);
        }
    }

    async getWithComments(id) {
        try {
            const tweet = await Tweet.findById(id).populate({path: 'comments'}).lean();
            return tweet;
        } catch (error) {
            console.error(error);
        }
    }

    async destroy(id) {
        try {
            await Tweet.findByIdAndRemove(id);
            return true;
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
}

module.exports = TweetRepository;