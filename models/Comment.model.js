const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    forum: {
      type: Schema.Types.ObjectId,
      ref: "Forum",
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);