const mongoose = require("mongoose");
const { Schema } = mongoose;

const carttdb = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Cart", carttdb);
