const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketplaceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    });

const Marketplace = mongoose.model("Marketplace", marketplaceSchema);

module.exports = Marketplace;