const express = require("express")
const router = express.Router()

// IMPORT MODEL
const User = require("../models/User.model")

router.get("/", async (req, res, next) => {
    // returns all user from the database.
    console.log(req.query)
    try {
        const response = await User.find(req.query)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.get("/:userId", async (req, res, next) => {
    // return a specific user using its id.
    try {
        const response = await User.findById(req.params.userId)

        if (!response) {
            res.status(400).json({ message: "User not found." })
            return
        }

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.put("/:userId", async (req, res, next) => {
    // updates a user
    const {
        username,
        firstName,
        lastName,
        email,
        password,
        profileImage,
        bio,
        location
    } = req.body

    if (!username || !firstName) {
        res.status(400).json({ message: "Username, and firstName are required." })
        return
    }

    try {
        const updatedUser = {
            username,
            firstName,
            lastName,
            email,
            password,
            profileImage,
            bio,
            location
        }

        if (Object.values(updatedUser).includes(undefined)) {
            res.status(400).json({ message: "Missing information." })
            return
        }

        const response = await User.findByIdAndUpdate(
            req.params.userId,
            updatedUser,
            { returnDocument: "after", runValidators: true }
        )

        if (!response) {
            res.status(400).json({ message: "User not found." })
            return
        }

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.delete("/:userId", async (req, res, next) => {
    // removes a user from the database.
    try {
        const response = await User.findByIdAndDelete(req.params.userId)

        if (!response) {
            res.status(400).json({ message: "User not found." })
            return
        }

        res.json({ message: "Deleted successfully" })
    } catch (error) {
        next(error)
    }
})

module.exports = router