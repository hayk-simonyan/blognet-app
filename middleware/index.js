const Article = require('../models/article');
const Comment = require('../models/comments');

const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in');
    res.redirect('/login');
};

middlewareObj.checkArticleOwnership = (req, res, next) => {
    if(req.isAuthenticated()) {
        Article.findById(req.params.id)
            .then(foundArticle => {
                if(foundArticle.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You are not the owner of this article');
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


middlewareObj.checkCommentOwnership = (req, res, next) => {
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

module.exports = middlewareObj;