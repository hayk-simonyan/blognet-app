const { check } = require('express-validator');

const Comment = require('../models/comments');

const commentMiddlewares = {};

commentMiddlewares.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in');
    res.redirect('/login');
};

commentMiddlewares.checkCommentOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.commentId)
            .then(comment => {
                if (comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You do not own this comment');
                    res.redirect('back');
                }
            })
            .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            });
    } else {
        req.flash('error', 'You need to be logged in');
        res.redirect('back');
    }
};

commentMiddlewares.checkCommentsContent = check('content')
    .isLength({min: 4, max: 100})
    .withMessage('Comment should be from 4 to 100 characters long');

module.exports = commentMiddlewares;