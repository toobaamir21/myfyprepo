require("dotenv").config();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.db_Uri)
  .then(() => console.log("successful"))
  .catch((err) => console.log(err));
