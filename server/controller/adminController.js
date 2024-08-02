const admin = require("../models/admin")

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

module.exports = {
    signup,
    signin
}