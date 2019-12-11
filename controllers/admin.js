const { validationResult } = require('express-validator');
const flash = require('connect-flash');

const Article = require('../models/article');
const User = require('../models/user');

exports.getNew = (req, res) => {
    const prevInputs = {
        title: '',
        image: '',
        content: ''
    }
    
    res.render('admin/new', { prevInputs: prevInputs, validationErrors: [] });
};

exports.postCreate = (req, res, next) => {
    const validationErrors = validationResult(req);

    const { title, image, content } = req.body

    const prevInputs = {
        title: title,
        image: image,
        content: content
    }
    
    if (!validationErrors.isEmpty()) {
        req.flash('error', validationErrors.array()[0].msg)
        return res.status(422).render(
            'admin/new', 
            { prevInputs: prevInputs, validationErrors: validationErrors.array() });
    }

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
            req.flash('success', 'Your article was created');
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
            res.render('admin/edit', { article: article, validationErrors: [] });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.putUpdate = (req, res, next) => {
    const validationErrors = validationResult(req);

    const { title, image, content } = req.body

    const prevInputs = {
        title: title,
        image: image,
        content: content
    }
    
    if (!validationErrors.isEmpty()) {
        req.flash('error', validationErrors.array()[0].msg)
        return res.status(422).render(
            'admin/new', 
            { prevInputs: prevInputs, validationErrors: validationErrors.array() });
    }

    Article.findById(req.params.id)
        .then(article => {
            if(!article) {
                console.log('not found')
            }
            article.title = title;
            article.image = image;
            article.content = content;
            return article.save()
                .then(editedArticle => {
                    console.log('updated');
                    req.flash('success', 'Article was successfully edited');
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
            req.flash('success', 'Article was successfully deleted')
            res.redirect('/articles/my-posts')
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

module.exports = exports;