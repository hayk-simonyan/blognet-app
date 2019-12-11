const { validationResult } = require('express-validator');

const Article = require('../models/article');
const Comment = require('../models/comments');

exports.postCreateComment = (req, res, next) => {
    Article.findById(req.params.id)
        .then(article => {
            const validationErrors = validationResult(req);

            const { content } = req.body
            
            if (!validationErrors.isEmpty()) {
                req.flash('error', validationErrors.array()[0].msg)
                return res.status(422).redirect('back');
            }

            const author = {
                id: req.user._id,
                username: req.user.username
            };
            const newComment = {
                content: content,
                author: author
            };

            Comment.create(newComment)
                .then(comment => {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();

                    article.comments.push(comment);
                    article.save();

                    req.flash('success', 'Comment was successfully added');
                    res.redirect('/articles/' + article._id);
                })
                .catch(err => {
                    req.flash('error', 'Something went wrong. Please try again');
                    res.redirect('/articles');
                    console.log(err)
                })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
};

exports.putUpdateComment = (req, res, next) => {
    const validationErrors = validationResult(req);

    const { content } = req.body
    
    if (!validationErrors.isEmpty()) {
        req.flash('error', validationErrors.array()[0].msg)
        return res.status(422).redirect('back');
    }

    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const newComment = {
        content: content,
        author: author
    };
    const previousComment = req.params.commentId;
    
    Comment.findByIdAndUpdate(previousComment, newComment)
        .then(updatedComment => {
            req.flash('success', 'Your comment was updated');
            res.redirect('/articles/' + req.params.id);
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
};

exports.deleteComment = (req, res, next) => {
    const comment = req.params.commentId;
    Comment.findByIdAndRemove(req.params.commentId)
        .then(() => {
            req.flash('success', 'Comment was deleted');
            res.redirect('/articles/' + req.params.id);
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

module.exports = exports;