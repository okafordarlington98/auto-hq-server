const express = require("express")
const router = express.Router()

// IMPORT MODEL
const Comment = require("../models/Comment.model")

router.get("/forum/:forumId", async (req, res, next) => {
  try {

    const comments = await Comment.find({
      forum: req.params.forumId,
    }).sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {
    next(error);
  }
});

// CREATE comment
router.post("/", async (req, res, next) => {

  try {

    const newComment = await Comment.create(req.body);

    res.json(newComment);

  } catch (error) {
    next(error);
  }

});

// Edit Comment
router.put("/:commentId", async (req, res, next) => {

  try {

    const updated = await Comment.findByIdAndUpdate(

      req.params.commentId,

      req.body,

      {
        new: true,
      }

    );

    res.json(updated);

  } catch (error) {
    next(error);
  }

});


// DELETE comment
router.delete("/:commentId", async (req, res, next) => {

  try {

    await Comment.findByIdAndDelete(req.params.commentId);

    res.json({
      message: "Deleted",
    });

  } catch (error) {
    next(error);
  }

});

// Like Comment
router.put("/:commentId/like", async (req, res, next) => {

  try {

    const comment = await Comment.findById(req.params.commentId);

    comment.likes += 1;

    await comment.save();

    res.json(comment);

  } catch (error) {
    next(error);
  }

});

module.exports = router