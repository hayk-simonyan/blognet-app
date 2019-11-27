const express = require('express');

const middleware = require('../middleware');

const commentsController = require('../controllers/comments');

const router = express.Router({ mergeParams: true });

router.route('/')
    // CREATE
    .post(middleware.isLoggedIn, commentsController.postCreateComment);

router.route('/:commentId')
    // UPDATE
    .put(middleware.checkCommentOwnership, commentsController.putUpdateComment)
    // DELETE
    .delete(middleware.checkCommentOwnership, commentsController.deleteComment);

module.exports = router;