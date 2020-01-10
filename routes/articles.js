const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles');

router.route('/')
  /* GET home page. */
  .get(articlesController.getHomePage);

router.route('/articles')
  // INDEX
  .get(articlesController.getIndex);
  
router.route('/articles/tech')
  // INDEX
  .get(articlesController.getTech);
  
router.route('/articles/math')
  // INDEX
  .get(articlesController.getMath);
  
router.route('/articles/physics')
  // INDEX
  .get(articlesController.getPhysics);

router.route('/articles/programming')
  // INDEX
  .get(articlesController.getProgramming);

router.route('/articles/engineering')
  // INDEX
  .get(articlesController.getEngineering);

router.route('/articles/energetics')
  // INDEX
  .get(articlesController.getEnergetics);

router.route('/articles/:id')
  // SHOW
  .get(articlesController.getShow);

module.exports = router;
