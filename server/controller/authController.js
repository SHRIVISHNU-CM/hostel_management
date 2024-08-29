const user = require('../models/user')
const userInfo = require('../models/userTwo')
const bcrypt = require("bcrypt")

//sign up controller
const signup = async (req, res) => {
    const { name, password, phone, address, college } = req.body
    try {
        if (!name || !password || !phone || !address || !college) {
            return res.status(400).json({
                "message": "Enter your all credentials"
            })
        }
        const OneUser = await user.findOne({ name: name })
        if (OneUser) {
            return res.status(400).json({
                "message": "Please choose another name "
            })
        }
        const result = await user.create({
            name, password, phone, address, college
        })
        console.log(result)
        return res.status(200).json({
            "message": result,
            "user": "Successfully signedUp"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)

    }

}
//sign in controller
const signin = async (req, res) => {
    const { name, password } = req.body
    try {
        if (!name || !password) {
            return res.status(400).json({
                "message": "Provide correct Username & Password"
            })
        }
        const result = await user.findOne({ name: name }).select("+password")

        if (result && (await bcrypt.compare(password, result.password))) {

            console.log(result)
            const token = result.jwtToken()
            result.password = undefined
            const cookieOptions = {
                maxAge: 1 * 60 * 60 * 1000,
                httpOnly: true
            }

            return res.cookie('token', token, cookieOptions).status(200).json({
                "message": result,
                "info": "Successfully login",
                "token": token
            })
        } else {
            return res.status(401).json({

                "message": "Please check userName & Password"
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            "message": "User name & password Not Found"
        })
    }
}
//logout
const logout = async (req, res) => {
    try {
        const cookieOptions = {
            expires: new Date(),
            httpOnly: true
        }
        return res.status(200).cookie('token', null, cookieOptions).json({
            "message": "logout"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            "message": "error"
        })
    }

}

//user's profile
const userDetails = async (req, res) => {
    try {
        const postInfo = req.body
        const newInfo = new userInfo(postInfo)
        const userData = await user.findById(postInfo.main)
        const room_id = req.body.room_id

        if (!userData) {
            return res.status(400).json({
                "message": "User Not Found"
            })
        }
        console.log("room_id", room_id)
        const CheckRoom = await userInfo.findOne({ room_id: room_id })
        console.log(CheckRoom)
        if (!CheckRoom) {
            const info = await newInfo.save()

            if (!userData.rooms) {
                userData.rooms = [];
            }

            userData.rooms.push(info._id)
            await userData.save()

            res.status(200).json(info)
        } else {
            return res.status(400).json("Already Registered. Thank You!")

        }
    } catch (error) {
        console.log(error.message)
        return res.status(400).json("Bad request")
    }
}
//All user's profile
const AllDetails = async (req, res) => {
    try {
        const detail = await user.find().populate('rooms')
        console.log(detail)
        return res.status(200).json({
            "message": detail
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
}

//user delete
const userdelete = async (req, res) => {
    try {
        const userID = req.params.id
        const response = await user.findByIdAndDelete(userID)
        console.log(response)
        return res.status(200).json(response)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
}

//Delete userDetails
const deleteDetails = async (req, res) => {
    try {
        const roomDetails = await userInfo.findByIdAndDelete(req.params.id)
        if (!roomDetails) {
            return res.status(404).json({
                "message": "room noot found"
            })
        }
        const response = await user.updateOne({ rooms: req.params.id }, { $pull: { rooms: req.params.id } })

        console.log(response)
        return res.status(200).json({
            "message": "Successfully deleted"
        })
    } catch (error) {
        console.log(error.message)
        return res.status(400).json(error.message)
    }
}
//update userDetails

const updateDetails = async (req, res) => {
    try {
        const { alloted } = req.body
        const room = await userInfo.findByIdAndUpdate({ _id: req.params.id }, { alloted }, { new: true })

        console.log(room)
        return res.status(200).json(room)

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            "message": "Failed in Update"
        })
    }
}

//profile Update
const profileUpdate = async (req, res) => {
    try {
        const { name, password, phone, address, college } = req.body
        const updated = { name, phone, address, college }
        if (password) {
            updated.password = await bcrypt.hash(password, 10)
        }
        const response = await user.findByIdAndUpdate(req.params.id, updated, { new: true })

        console.log(response)
        return res.status(200).json({
            "message": response
        })

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            "message": "Failed to update"
        })
    }
}
//findOne user
const OneUser = async (req, res) => {
    try {
        const id = req.params.id
        // const response = await user.findById({ _id: id }).populate("rooms").select("-password") // remove password field
        const response = await user.findById({ _id: id }).populate("rooms") // remove password field

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
module.exports = {
    signup,
    signin,
    userDetails,
    AllDetails,
    userdelete,
    deleteDetails,
    updateDetails,
    profileUpdate,
    OneUser,
    logout
}