const mongoose = require('mongoose')
const {Schema} = mongoose

const productdb = new Schema(
  {
    prodName: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
    // userId:{type:String,required:true},
    deleted: {
      type: Boolean,
    },
  },

  { timestamps: true }
);

module.exports = new mongoose.model('Product',productdb)