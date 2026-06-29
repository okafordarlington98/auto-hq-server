const express = require("express")
const router = express.Router()

// IMPORT MODEL
const Forum = require("../models/Forum.model")

router.get("/", async (req, res, next) => {
    // returns all forums from the database.
    console.log(req.query)
    try {
        const response = await Forum.find(req.query)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.get("/:forumId", async (req, res, next) => {
    // return a specific forum using its id.
    try {
        const response = await Forum.findById(req.params.forumId)

        if (!response) {
            res.status(400).json({ message: "Forum not found." })
            return
        }

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    // creates a new forum document.
    const {
        name,
        description,
        icon,
        image
    } = req.body

    if (!name || !description) {
        res.status(400).json({ message: "Name and description are required." })
        return
    }

    try {
        const newForum = {
            name,
            description,
            icon,
            image
        }
        const response = await Forum.create(newForum)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.put("/:forumId", async (req, res, next) => {
    // updates a forum
    const {
        name,
        description,
        icon,
        image
    } = req.body

    if (!name || !description) {
        res.status(400).json({ message: "name and description are required." })
        return
    }

    try {
        const updatedForum = {
            name,
            description,
            icon,
            image
        }

        if (Object.values(updatedForum).includes(undefined)) {
            res.status(400).json({ message: "Missing information." })
            return
        }

        const response = await Forum.findByIdAndUpdate(
            req.params.forumId,
            updatedForum,
            { returnDocument: "after", runValidators: true }
        )

        if (!response) {
            res.status(400).json({ message: "Forum not found." })
            return
        }

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.delete("/:forumId", async (req, res, next) => {
    // removes a forum from the database.
    try {
        const response = await Forum.findByIdAndDelete(req.params.forumId)

        if (!response) {
            res.status(400).json({ message: "Forum not found." })
            return
        }

        res.json({ message: "Deleted successfully" })
    } catch (error) {
        next(error)
    }
})

module.exports = router