const admin = require("../models/admin")
const adminDB = require("../models/adminDB")
const cloudinary = require("cloudinary").v2
const contact = require("../models/contact")
const signup = async (req, res) => {
    try {
        const { name, password, secret } = req.body
        if (!name || !password || !secret) {
            return res.status(401).json({
                "message": "Please provide proper name, password, and Secret"
            })
        }
        const AdminName = await admin.findOne({ name: name })
        if (AdminName) {
            return res.status(404).json({
                "message": "Choose Another Name"
            })
        }
        if (secret === "hi") {
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

        } else {
            return res.status(401).json({
                "message": "Admin Unauthorized"
            })
        }

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            "message": error.message
        })
    }
}

const signin = async (req, res) => {
    try {
        const { name, password, secret } = req.body
        if (!name || !password || !secret) {
            return res.status(401).json({
                "message": "Check username & password"
            })
        }
        const response = await admin.findOne({ name: name })

        if (response) {
            const token = response.JWTAdmin()
            response.password = undefined
            const cookieOptions = {
                maxAge: 1 * 60 * 60 * 1000,
                httpOnly: true
            }
            return res.cookie('token', token, cookieOptions).status(200).json({
                "message": "successfully login ",
                "data": response,
                "token": token
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
//logout
const adminLogout = async(req,res) => {
    try {
        const cookieOptions ={
            expires: new Date(),
            httpOnly : true
        }
        return res.status(200).cookie('token',null,cookieOptions).json({
            "message":"Successfully Logout"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            "message":error
        })
    }
}
//post rooms
const DbRooms = async (req, res) => {
    try {

        const roomsInfo = req.body
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            roomsInfo.cloudinary_uri = result.secure_url
        }
        const newRoom = new adminDB(roomsInfo)
        const response = await admin.findById(roomsInfo.main)



        if (!response) {
            return res.status(400).json({
                "message": "User not found"
            })
        }
        const info = await newRoom.save()
        console.log(info)

        if (!response.adminPic) {
            admin.adminPic = []
        }
        response.adminPic.push(info._id)
        await response.save()
        return res.status(200).json(info)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            "message": error.message
        })
    }
}

//all rooms


const AllRooms = async (req, res) => {
    try {
        const response = await admin.find().populate("adminPic")
        console.log(response)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            "message": error.message
        })
    }
}

//update 
const UpdateRoom = async (req, res) => {
    try {
        const updateInfo = req.body
        const RoomsId = await adminDB.findById({ _id: req.params.id })
        const id = RoomsId.secure_url

        if (!RoomsId) {
            return res.status(400).json({
                "message": "Enter Correct ID"
            })
        }
        if (req.file) {
            if (id) {
                await cloudinary.uploader.destroy(id)
            }
        }
        const PicUpload = await cloudinary.uploader.upload(req.file.path)
        updateInfo.cloudinary_uri = PicUpload.secure_url
        console.log(PicUpload.secure_url)
        const updatedInfo = await adminDB.findByIdAndUpdate({ _id: req.params.id }, { $set: updateInfo }, { new: true })
        console.log(updatedInfo)
        return res.status(200).json({
            "message": updatedInfo
        })


    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            "message": error.message
        })
    }
}

//delete roomsDB

const DeleteRoomDB = async (req, res) => {
    try {
        const RoomDB = await adminDB.findByIdAndDelete(req.params.id)
        const response = await admin.updateOne({ adminPic: req.params.id }, { $pull: { adminPic: req.params.id } })

        console.log(response)
        return res.status(200).json({
            "message": response
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            "message": error.message
        })
    }
}

// contact us
const contactus = async (req, res) => {
    try {
        const { name, phone, email, college, hometown } = req.body
        const response = await contact.create({
            name, phone, email, college, hometown
        })
        console.log(response)
        return res.status(200).json({
            "message": response
        })
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            "message": error.message
        })
    }
}
//all contact
const allContact = async (req, res) => {
    try {
        const response = await contact.find()
        console.log(response)
        return res.status(200).json({
            "message": response
        })

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            'message': error.message
        })
    }
}
//One Room 
const findOneRoom = async (req, res) => {
    try {
        const response = await adminDB.find({ _id: req.params.id })
        console.log(response)
        return res.status(200).json({
            "message": response
        })

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            message: error.message
        })
    }
}
//find One Admin
const findAdmin = async (req, res) => {
    try {
        const response = await admin.findById(req.params.id)
        if (!response) {
            return res.status(400).json({
                "message": "not found"
            })
        }

        console.log(response)
        return res.status(200).json({
            "message": response
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            "message": error
        })
    }
}
//update admin
const adminUpdate = async (req, res) => {
    const id = req.params.id
    const { name, password } = req.body
    const response = await admin.findByIdAndUpdate({ _id: id }, { name, password }, { new: true })

    console.log(response)
    return res.status(200).json({
        "message": response
    })
}
//admin drop

const admindrop = async (req, res) => {
    try {
        const id = req.params.id
        const response = await admin.findByIdAndDelete(id)
        console.log(response)

        return res.status(200).json({
            "message": "successfully deleted"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            "message": error
        })
    }
}
module.exports = {
    signup,
    signin,
    DbRooms,
    AllRooms,
    UpdateRoom,
    DeleteRoomDB,
    contactus,
    allContact,
    findOneRoom,
    findAdmin,
    adminUpdate,
    admindrop,
    adminLogout
}