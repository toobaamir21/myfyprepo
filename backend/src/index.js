require('./db/conn')
const express = require('express')
const app = express()
const port = 8000
const productRoutes = require('./router/products/prodrouting')

app.use(express.json())

app.use("/api/products",productRoutes);

app.listen(port,()=>{
    console.log("listening to port ",port);
})