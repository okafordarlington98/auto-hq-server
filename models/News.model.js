const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    publishedDate: {
        type: Date,
        default: Date.now,
    },
},
    {
        timestamps: true,
    });

const News = mongoose.model("News", newsSchema);

module.exports = News;