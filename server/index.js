require('dotenv').config()
const express = require('express')
const app = express()
const routes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")
const DB = require('./models/connDB')
const cloudinary = require("cloudinary").v2
DB()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const port = 3001



app.use(express.json())
app.use("/api", routes)
app.use("/admin", adminRoutes)
app.listen(port, () => console.log(`Server is running at ${port}`))