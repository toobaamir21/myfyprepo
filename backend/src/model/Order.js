const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderdb = new Schema(
  {
    items: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    totalAmount: {
      type: Number,
    },
    // product: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Product",
    //   required: true,
    // },
    totalItems: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      requuired: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    selectedAddress: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Order", orderdb);
