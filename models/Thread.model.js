const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threadSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    forum: {
        type: Schema.Types.ObjectId,
        ref: "Forum",
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
},
    {
        timestamps: true,
    });

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;

