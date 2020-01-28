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

exports.getTech = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalArticles;

  Article.find({ title: { $regex: '.*' + 'tech' + '.*' } })
    .countDocuments()
    .then(numArticles => {
      totalArticles = numArticles;
      return Article.find({ title: { $regex: '.*' + 'tech' + '.*' } })
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

exports.getMath = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalArticles;

  Article.find({
    title: { $regex: '.*' + 'math' + '.*', $regex: '.*' + 'Math' + '.*' }
  })
    .countDocuments()
    .then(numArticles => {
      totalArticles = numArticles;
      return Article.find({
        title: { $regex: '.*' + 'math' + '.*', $regex: '.*' + 'Math' + '.*' }
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

exports.getPhysics = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalArticles;

  Article.find({ title: { $regex: '.*' + 'physics' + '.*' } })
    .countDocuments()
    .then(numArticles => {
      totalArticles = numArticles;
      return Article.find({ title: { $regex: '.*' + 'physics' + '.*' } })
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

exports.getProgramming = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalArticles;

  Article.find({ title: { $regex: '.*' + 'programming' + '.*' } })
    .countDocuments()
    .then(numArticles => {
      totalArticles = numArticles;
      return Article.find({ title: { $regex: '.*' + 'programming' + '.*' } })
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

exports.getEngineering = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalArticles;

  Article.find({ title: { $regex: '.*' + 'engineering' + '.*' } })
    .countDocuments()
    .then(numArticles => {
      totalArticles = numArticles;
      return Article.find({ title: { $regex: '.*' + 'engineering' + '.*' } })
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

exports.getEnergetics = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalArticles;

  Article.find({ title: { $regex: '.*' + 'energetics' + '.*' } })
    .countDocuments()
    .then(numArticles => {
      totalArticles = numArticles;
      return Article.find({ title: { $regex: '.*' + 'energetics' + '.*' } })
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
