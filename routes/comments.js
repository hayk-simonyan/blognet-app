const express = require("express");
const router = express.Router({ mergeParams: true });

const commentsMiddleware = require("../middleware/comments");
const commentsController = require("../controllers/comments");

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

router
  .route("/")
  // CREATE
  .post(isLoggedIn, [checkCommentsContent], postCreateComment);

router
  .route("/:commentId")
  // UPDATE
  .put(checkCommentOwnership, [checkCommentsContent], putUpdateComment)
  // DELETE
  .delete(checkCommentOwnership, deleteComment);

module.exports = router;
