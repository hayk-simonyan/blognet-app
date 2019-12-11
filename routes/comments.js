const express = require('express');

const commentsMiddleware = require('../middleware/comments');
const commentsController = require('../controllers/comments');

const router = express.Router({ mergeParams: true });

const {
    isLoggedIn,
    checkCommentOwnership,
    checkCommentsContent
} = commentsMiddleware;
const {
    postCreateComment,
    putUpdateComment,
    deleteComment
} = commentsController;

router.route('/')
    // CREATE
    .post(
        isLoggedIn,
        [
            checkCommentsContent
        ],
        postCreateComment
    );

router.route('/:commentId')
    // UPDATE
    .put(
        checkCommentOwnership, 
        [
            checkCommentsContent
        ],
        putUpdateComment
    )
    // DELETE
    .delete(checkCommentOwnership, deleteComment);

module.exports = router;