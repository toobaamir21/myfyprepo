require("dotenv").config();
require("./db/conn");
const express = require("express");

const app = express();
const port = process.env.PORT || 4000;
const productRouter = require("./router/prodrouting");
const userRouter = require("./router/userrouter");
const cartRouter = require("./router/cartrouting");
const orderRouter = require("./router/orderrouting");
const categoryRouter = require("./router/ctgryrouting");
const reviewRouter = require("./router/reviewrouting");
const chatRouter = require("./router/chatrouting");




app.use(express.json());


app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/category", categoryRouter);
app.use("/api/review", reviewRouter);
app.use("/api/chat", chatRouter);


app.listen(port, () => {
  console.log("listening to port ", port);
});
