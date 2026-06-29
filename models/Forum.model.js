const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
},
    {
        timestamps: true,
    });

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;