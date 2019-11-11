const Article = require('../models/article');

exports.getHomePage = (req, res) => {
    res.redirect('/articles');
};

exports.getIndex = (req, res, next) => {
    Article.find({})
        .then(allArticles => {
            res.render('articles/index', { allArticles: allArticles, user: req.user });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
};

exports.getShow = (req, res, next) => {
    Article.findById(req.params.id)
        // .populate('comments')
        .exec()
            .then(foundArticle => {
                res.render('articles/show', { article: foundArticle, user: req.user });
            })
            .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            });
};

module.exports = exports;