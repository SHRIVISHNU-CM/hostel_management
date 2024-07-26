require('dotenv').config()
const express = require('express')
const app = express()
const routes = require("./routes/userRoutes")
const DB = require('./models/connDB')
DB()
const port = 3001

app.use(express.json())
app.use("/api",routes)
app.listen(port,()=>console.log(`Server is running at ${port}`))