const express = require("express")
const router = express.Router()

// IMPORT MODEL
const Thread = require("../models/Thread.model")

router.get("/", async (req, res, next) => {
    // returns all threads from the database.
    console.log(req.query)
    try {
        const response = await Thread.find(req.query)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.get("/:threadId", async (req, res, next) => {
    // return a specific thread using its id.
    try {
        const response = await Thread.findById(req.params.threadId)

        if (!response) {
            res.status(400).json({ message: "Thread not found." })
            return
        }

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    // creates a new thread document.
    const {
        title,
        content,
        forum,
        author,
        image
    } = req.body

    if (!title || !content || !forum) {
        res.status(400).json({ message: "Title, content and forum are required." })
        return
    }

    try {
        const newThread = {
            title,
            content,
            forum,
            author,
            image
        }
        const response = await Thread.create(newThread)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.put("/:threadId", async (req, res, next) => {
    // updates a thread
    const {
        title,
        content,
        forum,
        author,
        image
    } = req.body

    if (!title || !content || !forum) {
        res.status(400).json({ message: "Title, content and forum are required." })
        return
    }

    try {
        const updatedThread = {
            title,
            content,
            forum,
            author,
            image
        }

        if (Object.values(updatedThread).includes(undefined)) {
            res.status(400).json({ message: "Missing information." })
            return
        }

        const response = await Thread.findByIdAndUpdate(
            req.params.threadId,
            updatedThread,
            { returnDocument: "after", runValidators: true }
        )

        if (!response) {
            res.status(400).json({ message: "Thread not found." })
            return
        }

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.delete("/:threadId", async (req, res, next) => {
    // removes a thread from the database.
    try {
        const response = await Thread.findByIdAndDelete(req.params.threadId)

        if (!response) {
            res.status(400).json({ message: "Thread not found." })
            return
        }

        res.json({ message: "Deleted successfully" })
    } catch (error) {
        next(error)
    }
})

module.exports = router