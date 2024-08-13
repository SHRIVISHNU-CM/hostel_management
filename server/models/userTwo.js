const mongoose  = require("mongoose")

const {Schema} = mongoose

const userDetails = new Schema({
    
    main:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserProfile"
    },
    room_id:{
        type:String
    }
})
module.exports = mongoose.model("userDetails",userDetails)

