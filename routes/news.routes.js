const express = require("express")
const router = express.Router()

// IMPORT MODEL
const News = require("../models/News.model")

router.get("/", async (req, res, next) => {
    // returns all news from the database.
    console.log(req.query)
    try {
        const response = await News.find(req.query)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.get("/:newsId", async (req, res, next) => {
    // return a specific news using its id.
    try {
        const response = await News.findById(req.params.newsId)

        if (!response) {
            res.status(400).json({ message: "News not found." })
            return
        }

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    // creates a new news document.
    const {
        title,
        summary,
        content,
        category,
        author,
        image,
        source,
        publishedDate
    } = req.body

    if (!title || !content || !category) {
        res.status(400).json({ message: "Title and content are required." })
        return
    }

    try {
        const newNews = {
            title,
            summary,
            content,
            category,
            author,
            image,
            source,
            publishedDate
        }
        const response = await News.create(newNews)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.put("/:newsId", async (req, res, next) => {
    // updates a news
    const {
        title,
        summary,
        content,
        category,
        author,
        image,
        source,
        publishedDate
    } = req.body

    if (!title || !content || !category) {
        res.status(400).json({ message: "Title and content are required." })
        return
    }

    try {
        const updatedNews = {
            title,
            summary,
            content,
            category,
            author,
            image,
            source,
            publishedDate
        }

        if (Object.values(updatedNews).includes(undefined)) {
            res.status(400).json({ message: "Missing information." })
            return
        }

        const response = await News.findByIdAndUpdate(
            req.params.newsId,
            updatedNews,
            { returnDocument: "after", runValidators: true }
        )

        if (!response) {
            res.status(400).json({ message: "News not found." })
            return
        }

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.delete("/:newsId", async (req, res, next) => {
    // removes a news from the database.
    try {
        const response = await News.findByIdAndDelete(req.params.newsId)

        if (!response) {
            res.status(400).json({ message: "News not found." })
            return
        }

        res.json({ message: "Deleted successfully" })
    } catch (error) {
        next(error)
    }
})

module.exports = router