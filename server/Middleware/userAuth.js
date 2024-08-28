const JWT = require("jsonwebtoken")

const Authjwt = (req, res, next) => {
    const token  = req.cookies.token || req.cookies
    if (!token){
        return res.status(400).json({
            "message":"Not AUTHORIZED"
        })
    }
    try {
        console.log(token)
        const payload = JWT.verify(token,process.env.SECRET)
        req.result = {id:payload.id,name:payload.name}
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            "message":"Not Authorized"
        })
    }
    next()

}
module.exports = Authjwt