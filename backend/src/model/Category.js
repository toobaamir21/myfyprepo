const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorydb = new Schema(
  {
    picture:{
        type:String,
        required:true
    },
    label: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Category", categorydb);
