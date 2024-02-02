const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatdb = new Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    user: 
      [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Chat", chatdb);

