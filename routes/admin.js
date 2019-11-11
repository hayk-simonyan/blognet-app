const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const middlewareObj = require('../middleware');

router.route('/articles/new')
  // NEW
  .get(middlewareObj.checkLoggedIn, adminController.getNew);

router.route('/articles')
  // CREATE
  .post(adminController.postCreate);

router.route('/articles/my-posts')
  .get(adminController.getMyPosts);


router.route('/articles/:id/edit')
  // EDIT
  .get(middlewareObj.checkLoggedIn, adminController.getEdit);

router.route('/articles/:id')
  // UPDATE
  .put(adminController.putUpdate)
  // DELETE
  // .delete(middlewareObj.checkArticlerOwnership, adminController.deleteDelete);
  .delete(adminController.deleteDelete);

module.exports = router;