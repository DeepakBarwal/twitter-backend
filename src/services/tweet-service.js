import { TweetRepository, HashtagRepository } from '../repositories/index.js';

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        const content = data.content;
        let tags = content.match(/#[a-zA-Z0-9_]+/g); // this regex extracts hashtags
        tags = tags.map(tag => tag.substring(1));
        try {
            const tweet = await this.tweetRepository.create(data);
            // DONE: create hashtags and add here
            /**
             * 1. bulkcreate in mongoose
             * 2. filter title of hashtag based on multiple tags
             * 3. how to add tweet id inside all the hastags
             */
            const alreadyPresentTags = await this.hashtagRepository.findByName(tags);
            let titleOfPresentTags = alreadyPresentTags.map(tag => tag.title);
            let newTags = tags.filter(tag => !titleOfPresentTags.includes(tag));
            newTags = newTags.map(tag => {
                return (
                    { title: tag, tweets: [tweet.id] }
                );
            });
            const response = await this.hashtagRepository.bulkCreate(newTags);
            // we created new hashtags with tweet id but there are already existing hashtags whose tweet id should also be updated.
            alreadyPresentTags.forEach((tag) => {
                tag.tweets.push(tweet.id);
                tag.save();
            });
            return tweet;
        } catch (error) {
            console.error(error);
        }
    }
}

export default TweetService;

/**
 * this is my #first #tweet. Really #excited!
 */