const express = require("express")
const router = express.Router()

// IMPORT MODEL
const Marketplace = require("../models/Marketplace.model")

router.get("/", async (req, res, next) => {
    // returns all marketplaces from the database.
    console.log(req.query)
    try {
        const response = await Marketplace.find(req.query)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.get("/:marketplaceId", async (req, res, next) => {
    // return a specific marketplace using its id.
    try {
        const response = await Marketplace.findById(req.params.marketplaceId)

        if (!response) {
            res.status(400).json({ message: "Marketplace not found." })
            return
        }

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    // creates a new marketplace document.
    const {
        title,
        description,
        price,
        category,
        condition,
        brand,
        model,
        year,
        location,
        image,
        contact
    } = req.body

    if (!title || !price || !category) {
        res.status(400).json({ message: "Title, price and category are required." })
        return
    }

    try {
        const newMarketplace = {
            title,
            description,
            price,
            category,
            condition,
            brand,
            model,
            year,
            location,
            image,
            contact
        }
        const response = await Marketplace.create(newMarketplace)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.put("/:marketplaceId", async (req, res, next) => {
    // updates a marketplace
    const {
        title,
        description,
        price,
        category,
        condition,
        brand,
        model,
        year,
        location,
        image,
        contact
    } = req.body

    if (!title || !price || !category) {
        res.status(400).json({ message: "Title, price and category are required." })
        return
    }

    try {
        const updatedMarketplace = {
            title,
            description,
            price,
            category,
            condition,
            brand,
            model,
            year,
            location,
            image,
            contact
        }

        if (Object.values(updatedMarketplace).includes(undefined)) {
            res.status(400).json({ message: "Missing information." })
            return
        }

        const response = await Marketplace.findByIdAndUpdate(
            req.params.marketplaceId,
            updatedMarketplace,
            { returnDocument: "after", runValidators: true }
        )

        if (!response) {
            res.status(400).json({ message: "Marketplace not found." })
            return
        }

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.delete("/:marketplaceId", async (req, res, next) => {
    // removes a marketplace from the database.
    try {
        const response = await Marketplace.findByIdAndDelete(req.params.marketplaceId)

        if (!response) {
            res.status(400).json({ message: "Marketplace not found." })
            return
        }

        res.json({ message: "Deleted successfully" })
    } catch (error) {
        next(error)
    }
})

module.exports = router