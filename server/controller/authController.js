const user = require('../models/user')
const userInfo = require('../models/userTwo')

//sign up controller
const signup = async (req, res) => {
    const { name, password } = req.body
    try {
        if (!name || !password) {
            return res.status(400).json({
                "message": "Enter your Name & Password"
            })
        }
        const OneUser = await user.findOne({ name: name })
        if (OneUser) {
            return res.status(400).json({
                "message": "Please choose another name "
            })
        }
        const result = await user.create({
            name, password
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
        const result = await user.findOne({ name: name, password: password })

        if (result) {
            console.log(result)
            return res.status(200).json({
                "message": result,
                "info": "Successfully login"
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

//user's profile
const userDetails = async (req, res) => {
    try {
        const postInfo = req.body
        const newInfo = new userInfo(postInfo)
        const userData = await user.findById(postInfo.main)

        if (!userData) {
            return res.status(400).json({
                "message": "User Not Found"
            })
        }

        const info = await newInfo.save()

        if (!userData.rooms) {
            userData.rooms = [];
        }

        userData.rooms.push(info._id)
        await userData.save()

        res.status(200).json(info)
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
module.exports = {
    signup,
    signin,
    userDetails,
    AllDetails,
    userdelete
}