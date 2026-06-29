const express = require("express")
const router = express.Router()

// IMPORT MODEL
const Event = require("../models/Events.model")

router.get("/", async (req, res, next) => {
    // returns all events from the database.
    console.log(req.query)
    try {
        const response = await Event.find(req.query)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.get("/:eventId", async (req, res, next) => {
    // return a specific event using its id.
    try {
        const response = await Event.findById(req.params.eventId)

        if (!response) {
            res.status(400).json({ message: "Event not found." })
            return
        }

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    // creates a new event document.
    const {
        title,
        description,
        location,
        date,
        startTime,
        endTime,
        image,
        organizer,
    } = req.body

    if (!title || !location) {
        res.status(400).json({ message: "title and name are required." })
        return
    }

    try {
        const newEvent = {
            title,
            description,
            location,
            date,
            startTime,
            endTime,
            image,
            organizer,
        }
        const response = await Event.create(newEvent)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.put("/:eventId", async (req, res, next) => {
    // updates a event
    const {
        title,
        description,
        location,
        date,
        startTime,
        endTime,
        image,
        organizer,
    } = req.body

    if (!title || !location) {
        res.status(400).json({ message: "title and name are required." })
        return
    }

    try {
        const updatedEvent = {
            title,
            description,
            location,
            date,
            startTime,
            endTime,
            image,
            organizer,
        }

        if (Object.values(updatedEvent).includes(undefined)) {
            res.status(400).json({ message: "Missing information." })
            return
        }

        const response = await Event.findByIdAndUpdate(
            req.params.eventId,
            updatedEvent,
            { returnDocument: "after", runValidators: true }
        )

        if (!response) {
            res.status(400).json({ message: "Event not found." })
            return
        }

        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.delete("/:eventId", async (req, res, next) => {
  // removes a event from the database.
  try {
    const response = await Event.findByIdAndDelete(req.params.eventId)

    if (!response) {
      res.status(400).json({ message: "Event not found." })
      return
    }

    res.json({ message: "Deleted successfully" })
  } catch (error) {
    next(error)
  }
})

module.exports = router