const mongoose = require('mongoose')
const {Schema} = mongoose

const productdb = new Schema(
  {
    prodName: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    images: {
      type: [String],
      required: true,
    },
    price: { type: Number, required: true },
    // userId:{type:String,required:true},
  },
  { timestamps: true }
);

module.exports = new mongoose.model('Product',productdb)