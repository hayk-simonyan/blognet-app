const Article = require('../models/article');
const User = require('../models/user');

exports.getNew = (req, res) => {
    res.render('admin/new');
};

exports.postCreate = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const content = req.body.content;
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const newArticle = {
        title: title,
        image: image,
        content: content,
        author: author
    };
    Article.create(newArticle)
        .then(article => {
            res.redirect('/articles');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

exports.getMyPosts = (req, res) => {
    Article.find({'author.id': req.user._id})
        .then(adminArticles => {
            res.render('admin/my-posts', { adminArticles: adminArticles })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getEdit = (req, res, next) => {
    Article.findById(req.params.id)
        .then(article => {
            req.flash('success', 'Article was successfully edited');
            res.render('admin/edit', { article: article });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.putUpdate = (req, res, next) => {
    console.log(req.body.title)
    const updatedTitle = req.body.title;
    const updatedImage = req.body.image;
    const updatedContent = req.body.content;
    Article.findById(req.params.id)
        .then(article => {
            if(!article) {
                console.log('not found')
            }
            article.title = updatedTitle;
            article.image = updatedImage;
            article.content = updatedContent;
            return article.save()
                .then(editedArticle => {
                    console.log('updated')
                    res.redirect('/articles/' + req.params.id)
                })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.deleteDelete = (req, res, next) => {
    Article.findByIdAndRemove(req.params.id)
        .then(deleted => {
            res.redirect('/articles/my-posts')
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

module.exports = exports;