const jwt = require("jsonwebtoken")

const adminAuth = (req, res, next) => {
    const token = req.cookies.token 
    // if (!token) {
    //     return res.status(400).json({
    //         "message": "Not Authorized!!"
    //     })
    // }
    try {
        const payload = jwt.verify(token, process.env.SECRET)
        req.response = {  name: payload.name }
        next()


    } catch (error) {
        console.log(error)
        return res.status(400).json({
            "message": error
        })
    }
}
module.exports = adminAuth