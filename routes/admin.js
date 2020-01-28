const express = require('express');
const router = express.Router();

const adminMiddlewares = require('../middleware/admin');
const adminController = require('../controllers/admin');

const {
  isLoggedIn,
  checkArticleOwnership,
  checkPostsTitle,
  checkPostsImage,
  checkPostsContent
} = adminMiddlewares;

const {
  getNew,
  postCreate,
  getMyPosts,
  getEdit,
  putUpdate,
  deleteDelete
} = adminController;

router
  .route('/new')
  // NEW
  .get(isLoggedIn, getNew);

router
  .route('/')
  // CREATE
  .post(
    isLoggedIn,
    [checkPostsTitle, checkPostsImage, checkPostsContent],
    postCreate
  );

router.route('/my-posts').get(isLoggedIn, getMyPosts);

router
  .route('/:id/edit')
  // EDIT
  .get(checkArticleOwnership, getEdit);

router
  .route('/:id')
  // UPDATE
  .put(
    checkArticleOwnership,
    [checkPostsTitle, checkPostsImage, checkPostsContent],
    putUpdate
  )
  // DELETE
  .delete(checkArticleOwnership, deleteDelete);

module.exports = router;
