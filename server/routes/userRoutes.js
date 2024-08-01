const {signup, signin,userDetails,AllDetails,userdelete,deleteDetails,updateDetails,profileUpdate} = require('../controller/authController')
const express = require('express')
const router = express.Router()

router.post('/signup',signup)
router.post('/signin', signin)
router.get("/all",AllDetails)
router.post('/details',userDetails)
router.delete('/delete/:id',userdelete)
router.delete("/delete/details/:id",deleteDetails)
router.put("/user/details/:id",updateDetails)
router.put("/profile/update/:id",profileUpdate)

module.exports = router