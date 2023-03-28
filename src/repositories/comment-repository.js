import Comment from '../models/comment.js';
import CrudRepository from './crud-repository.js';

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }

    async find(id) {
        try {
            const comment = await Comment.findById(id).populate({path: 'likes'});
            return comment;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default CommentRepository;