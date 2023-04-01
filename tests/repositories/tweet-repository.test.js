import TweetRepository from "../../src/repositories/tweet-repository.js";
import Tweet from "../../src/models/tweet.js";

jest.mock('../../src/models/tweet.js');

describe('Create tweet tests', () => {
    test('should create a new tweet and return it', async () => {
        const data = {
            content: 'testing tweet'
        }
        const spy = jest.spyOn(Tweet, 'create').mockImplementation(() => {
            return { ...data, createdAt: '2023-01-04', updatedAt: '2023-01-04' };
        });
        const tweetRepository = new TweetRepository();
        const tweet = await tweetRepository.create(data);
    
        expect(spy).toHaveBeenCalled();
        expect(tweet.content).toBe(data.content);
        expect(tweet.createdAt).toBeDefined();
    });
    
    test('should not create a tweet and throw exception', async () => {
        const data = {
            content: 'testing tweet'
        }
        const spy = jest.spyOn(Tweet, 'create').mockImplementation(() => {
            throw new Error('something went wrong');
        });
        const tweetRepository = new TweetRepository();
        const tweet = await tweetRepository.create(data).catch(err => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('something went wrong');
        });
    });
});

describe('Get all tweets tests', () => {
    const data = {
        content: 'testing tweet'
    }
    const tweetsArray = [{ ...data, createdAt: '2023-01-04', updatedAt: '2023-01-04' }, { ...data, createdAt: '2023-01-04', updatedAt: '2023-01-04' }, { ...data, createdAt: '2023-01-04', updatedAt: '2023-01-04' }, { ...data, createdAt: '2023-01-04', updatedAt: '2023-01-04' }, { ...data, createdAt: '2023-01-04', updatedAt: '2023-01-04' }];
    const findResponse = {tweetsArray};
    findResponse.skip = jest.fn((offset) => findResponse);
    findResponse.limit = jest.fn((limit) => findResponse.tweetsArray.slice(0, limit));
    test('testing limit for getAll', async () => {
        const spy = jest.spyOn(Tweet, 'find').mockImplementation(() => {
            return findResponse;
        });
        const tweetRepository = new TweetRepository();
        const tweets = await tweetRepository.getAll(0, 2);
        expect(spy).toHaveBeenCalled();
        expect(tweets).toHaveLength(2);
    }); 
});

// test('actually calling model', async () => {
//     const data = {
//         content: 'bigggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg'
//     }
//     const tweet = await Tweet.create(data);
//     expect(tweet).toBe(undefined);
// });