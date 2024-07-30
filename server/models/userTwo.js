const mongoose  = require("mongoose")

const {Schema} = mongoose

const userDetails = new Schema({
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    college:{
        type:String
    },
    main:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserProfile"
    }
})
module.exports = mongoose.model("userDetails",userDetails)

