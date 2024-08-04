const admin = require("../models/admin")
const adminDB = require("../models/adminDB")
const upload = require("../multer")
const cloudinary = require("cloudinary").v2
const signup = async (req, res) => {
    try {
        const { name, password } = req.body
        if (!name || !password) {
            return res.status(401).json({
                "message": "Please provide proper name & passord"
            })
        }
        const username = await admin.findOne({ name: name })

        if (username) {
            return res.status(400).json({
                "message": "Username already exist"
            })
        }
        const response = await admin.create({
            name, password
        })
        console.log(response)
        return res.status(200).json({
            "message": "Successfully admin created"
        })

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            "message": error.message
        })
    }
}

const signin = async (req, res) => {
    try {
        const { name, password } = req.body
        if (!name || !password) {
            return res.status(401).json({
                "message": "Check username & password"
            })
        }
        const response = await admin.findOne({
            name: name
        })
        if (response) {
            return res.status(200).json({
                "message": "successfully login "
            })
        } else {
            return res.status(400).json({
                "message": "check username and password "
            })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            "message": error.message
        })
    }
}

//post rooms
const DbRooms = async (req,res) =>{
    try {
        
        const roomsInfo = req.body
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path)
            roomsInfo.cloudinary_uri = result.secure_url
        }
        const newRoom = new adminDB(roomsInfo)
        const response = await admin.findById(roomsInfo.main)

        

        if (!response) {
            return res.status(400).json({
                "message":"User not found"
            })
        }
        const info = await newRoom.save()
        console.log(info)

        if (! response.adminPic){
            admin.adminPic = []
        }
        response.adminPic.push(info._id)
        await response.save()
        return res.status(200).json(info)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            "message":error.message
        })
    }
}

//all rooms


const AllRooms = async(req,res) => {
    try {
        const response = await admin.find().populate("adminPic")
        console.log(response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            "message":error.message
        })
    }
}


 module.exports = {
    signup,
    signin,
    DbRooms,
    AllRooms,
}