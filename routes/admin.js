const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const middlewareObj = require('../middleware');

router.route('/articles/new')
  // NEW
  .get(middlewareObj.isLoggedIn, adminController.getNew);

router.route('/articles')
  // CREATE
  .post(middlewareObj.isLoggedIn, adminController.postCreate);

router.route('/articles/my-posts')
  .get(middlewareObj.isLoggedIn, adminController.getMyPosts);


router.route('/articles/:id/edit')
  // EDIT
  .get(middlewareObj.checkArticleOwnership, adminController.getEdit);

router.route('/articles/:id')
  // UPDATE
  .put(middlewareObj.checkArticleOwnership, adminController.putUpdate)
  // DELETE
  // .delete(middlewareObj.checkArticlerOwnership, adminController.deleteDelete);
  .delete(middlewareObj.checkArticleOwnership, adminController.deleteDelete);

module.exports = router;