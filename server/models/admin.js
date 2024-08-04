const mongoose = require("mongoose")

const { Schema } = mongoose

const admin = new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    secret:{
        type:String
    },
    adminPic: [{
        type: "ObjectId",
        ref: "adminDB"
    }]
})
module.exports = mongoose.model("admin", admin)