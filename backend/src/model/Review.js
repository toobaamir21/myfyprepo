const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewdb = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0, 
      max: 5, 
      required: true,
    },
    image: {
      type: [String],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Review", reviewdb);
