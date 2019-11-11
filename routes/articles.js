const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles');

router.route('/')
  /* GET home page. */
  .get(articlesController.getHomePage);

router.route('/articles')
  // INDEX
  .get(articlesController.getIndex)

router.route('/articles/:id')
  // SHOW
  .get(articlesController.getShow)

module.exports = router;
