require('dotenv').config()
require('./db/conn')
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const productRoutes = require('./router/products/prodrouting')
const userRouter = require('./router/userrouter')

app.use(express.json())

app.use("/api/products",productRoutes);
app.use("/api/users",userRouter);

app.listen(port,()=>{
    console.log("listening to port ",port);
})