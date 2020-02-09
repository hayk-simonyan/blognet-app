const Article = require('../models/article');

const ITEMS_PER_PAGE = 9;

exports.getHomePage = (req, res) => {
  res.redirect('/articles');
};

exports.getIndex = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalArticles;

  Article.find()
    .countDocuments()
    .then(numArticles => {
      totalArticles = numArticles;
      return Article.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(allArticles => {
      res.render('articles/index', {
        allArticles: allArticles,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalArticles,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalArticles / ITEMS_PER_PAGE)
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCategory = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalArticles;
  console.log(req.params.categoryName);

  Article.find({ title: { $regex: '.*' + req.params.categoryName + '.*' } })
    .countDocuments()
    .then(numArticles => {
      totalArticles = numArticles;
      return Article.find({
        title: { $regex: '.*' + req.params.categoryName + '.*' }
      })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(allArticles => {
      res.render('articles/index', {
        allArticles: allArticles,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalArticles,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalArticles / ITEMS_PER_PAGE)
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getShow = (req, res, next) => {
  Article.findById(req.params.id)
    .populate('comments')
    .exec()
    .then(foundArticle => {
      res.render('articles/show', {
        article: foundArticle,
        validationErrors: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

module.exports = exports;
