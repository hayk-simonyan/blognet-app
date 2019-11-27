const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const middlewareObj = require('../middleware');

router.route('/new')
  // NEW
  .get(middlewareObj.isLoggedIn, adminController.getNew);

router.route('/')
  // CREATE
  .post(middlewareObj.isLoggedIn, adminController.postCreate);

router.route('/my-posts')
  .get(middlewareObj.isLoggedIn, adminController.getMyPosts);


router.route('/:id/edit')
  // EDIT
  .get(middlewareObj.checkArticleOwnership, adminController.getEdit);

router.route('/:id')
  // UPDATE
  .put(middlewareObj.checkArticleOwnership, adminController.putUpdate)
  // DELETE
  // .delete(middlewareObj.checkArticlerOwnership, adminController.deleteDelete);
  .delete(middlewareObj.checkArticleOwnership, adminController.deleteDelete);

module.exports = router;