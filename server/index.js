require('dotenv').config()
const express = require('express')
const app = express()
const routes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")
const DB = require('./models/connDB')
const cloudinary = require("cloudinary").v2
const cors = require("cors")
const cookieparser = require("cookie-parser")

DB() // database connection established
//configuration cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const port = 3001 // define port



app.use(express.json()) //parse incoming json request
app.use(cookieparser()) // parse incomming cookies
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
)) // establish connection between frontend using cross origin resource sharing
app.use("/api", routes) // routes for users
app.use("/admin", adminRoutes) // routes for admin 
app.listen(port, () => console.log(`Server is running at ${port}`)) // running server at port