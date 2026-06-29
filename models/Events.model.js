const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    organizer: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;