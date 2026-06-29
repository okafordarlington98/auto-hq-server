const express = require("express")
const router = express.Router()

// IMPORT MODEL
const Comment = require("../models/Comment.model")

router.get("/", async (req, res, next) => {
    // returns all comment from the database.
    console.log(req.query)
    try {
        const response = await Comment.find(req.query)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.get("/:commentId", async (req, res, next) => {
    // return a specific comment using its id.
    try {
        const response = await Comment.findById(req.params.commentId)

        if (!response) {
            res.status(400).json({ message: "Comment not found." })
            return
        }

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    // creates a new comment document.
    const {
        content,
        author,
        thread
    } = req.body

    if (!content) {
        res.status(400).json({ message: "Content are required." })
        return
    }

    try {
        const newComment = {
            content,
        author,
        thread
        }
        const response = await Comment.create(newComment)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.put("/:commentId", async (req, res, next) => {
    // updates a comment
    const {
        content,
        author,
        thread
    } = req.body

    if (!content) {
        res.status(400).json({ message: "Content are required." })
        return
    }

    try {
        const updatedComment = {
            content,
        author,
        thread
        }

        if (Object.values(updatedComment).includes(undefined)) {
            res.status(400).json({ message: "Missing information." })
            return
        }

        const response = await Comment.findByIdAndUpdate(
            req.params.commentId,
            updatedComment,
            { returnDocument: "after", runValidators: true }
        )

        if (!response) {
            res.status(400).json({ message: "Comment not found." })
            return
        }

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.delete("/:commentId", async (req, res, next) => {
    // removes a comment from the database.
    try {
        const response = await Comment.findByIdAndDelete(req.params.commentId)

        if (!response) {
            res.status(400).json({ message: "Comment not found." })
            return
        }

        res.json({ message: "Deleted successfully" })
    } catch (error) {
        next(error)
    }
})

module.exports = router