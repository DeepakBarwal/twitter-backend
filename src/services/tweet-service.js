const { TweetRepository } = require('../repositories/index');

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
    }

    async create(data) {
        const content = data.content;
        let tags = content.match(/#[a-zA-Z0-9_]+/g); // this regex extracts hashtags
        tags = tags.map(tag => tag.substring(1));
        console.log(tags);
        try {
            const tweet = await this.tweetRepository.create(data);
            // TODO: create hashtags and add here
            /**
             * 1. bulkcreate in mongoose
             * 2. filter title of hashtag based on multiple tags
             * 3. how to add tweet id inside all the hastags
             */
            return tweet;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = TweetService;

/**
 * this is my #first #tweet. Really #excited!
 */