const mongoose = require("mongoose")

const {Schema} = mongoose

const contactModel = new Schema({
    name:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    college:{
        type:String
    },
    hometown:{
        type:String
    }

})

module.exports = mongoose.model("contactModel",contactModel)