const mongoose = require("mongoose");
const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { Schema } = mongoose

const User = new Schema({
    name: {
        type: String,
        required: [true, "Enter username"]
    },
    password: {
        type: String,
        required: [true, "Please enter Password"]
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    },
    college: {
        type: String
    },
    UserType: {
        type: String,
        default: "student",
        enum: ["student", "other"]
    },
    rooms: [{
        type: "ObjectId",
        ref: "userDetails"
    }]
}, { timestamps: true })

User.pre("save", async function (next) {
    //if password is not modified then do not hash it
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    return next()
})
User.methods = {
    jwtToken(){
        return JWT.sign(
            {id:this._id, name: this.name},
            process.env.SECRET,
            {expiresIn:"1h"}
        )
    }
}

module.exports = mongoose.model("UserProfile", User)