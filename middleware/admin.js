const { check } = require('express-validator');

const Article = require('../models/article');

const adminMiddlewares = {};

adminMiddlewares.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in');
    res.redirect('/login');
};

adminMiddlewares.checkArticleOwnership = (req, res, next) => {
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

adminMiddlewares.checkPostsTitle = check('title')
    .isLength({min: 4, max: 100})
    .withMessage('Title should be from 4 to 100 characters long');

adminMiddlewares.checkPostsImage = check('image')
    .isLength({min: 6, max: 500})
    .withMessage('Please include some image link related to your article, Image link should be up to 500 characters long');

adminMiddlewares.checkPostsContent = check('content')
    .isLength({min: 100, max: 10000})
    .withMessage('Content should be from 100 to 10000 characters long');

module.exports = adminMiddlewares;