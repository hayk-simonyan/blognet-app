const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 100,
        maxlength: 20000
    },
    created: { 
        type: Date, 
        default: Date.now 
    },
    author: {
        id: {
            type: Schema.Types.ObjectId,
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
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;