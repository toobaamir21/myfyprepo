const mongoose = require("mongoose");
const { Schema } = mongoose;

const messagedb = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  { timestamps: true }
);
module.exports = new mongoose.model("Message", messagedb);

