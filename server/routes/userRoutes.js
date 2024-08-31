const {signup, signin,userDetails,AllDetails,userdelete,deleteDetails,updateDetails,profileUpdate,OneUser, logout} = require('../controller/authController')
const express = require('express')
const router = express.Router()
const userJWT = require("../Middleware/userAuth")
const adminJWT = require("../Middleware/adminAuth")

router.post('/signup',signup)
router.post('/signin', signin)
router.get('/logout',logout)
router.get("/all",userJWT,adminJWT,AllDetails)
router.get("/oneuser/:id",OneUser)
router.post('/details',userDetails)
router.delete('/delete/:id',userdelete)
router.delete("/delete/details/:id",deleteDetails)
router.put("/user/details/:id",updateDetails)
router.put("/profile/update/:id",userJWT,profileUpdate)

module.exports = router