const mongnoose = require('mongoose');

const Schema = mongnoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100
    },
    created: { 
        type: Date, 
        default: Date.now 
    },
    author: {
        id: {
            type: mongnoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: {
            type: String,
            required: true,
            maxlength: 20,
            minlength: 2
        }
    }
});

const Comment = mongnoose.model('Comment', commentSchema);

module.exports = Comment;