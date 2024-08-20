const mongoose = require("mongoose")

const { Schema } = mongoose

const adminDatabase = new Schema({
    sharing: {
        type: String
    },
    cloudinary_uri: {
        type: String
    },
    availability: {
        type: String
    },
    amount:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    main: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    }

})

module.exports = mongoose.model("adminDB", adminDatabase)