const {signup, signin,userDetails,AllDetails,userdelete} = require('../controller/authController')
const express = require('express')
const router = express.Router()

router.post('/signup',signup)
router.get('/signin', signin)
router.get("/all",AllDetails)
router.post('/details',userDetails)
router.delete('/delete/:id',userdelete)

module.exports = router