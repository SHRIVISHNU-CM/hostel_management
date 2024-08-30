const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')

const { Schema } = mongoose

const admin = new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    secret: {
        type: String
    },
    adminPic: [{
        type: "ObjectId",
        ref: "adminDB"
    }]
})
admin.methods = {
    JWTAdmin() {
        return jwt.sign(
            {  name: this.name },
            process.env.SECRET,
            { expiresIn: '1h' }
        )
    }
}

module.exports = mongoose.model("admin", admin)