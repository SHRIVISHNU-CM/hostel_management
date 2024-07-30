const mongoose = require("mongoose");

const {Schema } = mongoose

const User = new Schema({
    name:{
        type:String,
        required:[true,"Enter username"]
    },
    password:{
        type:String,
        required:[true,"Please enter Password"]
    },
    UserType:{
        type:String,
        default:"student",
        enum:["student","admin"]
    },
    rooms:[{
        type:"ObjectId",
        ref:"userDetails"
    }]
},{timestamps:true})
module.exports = mongoose.model("UserProfile", User)