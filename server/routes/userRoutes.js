const {signup, signin} = require('../controller/authController')
const express = require('express')
const router = express.Router()

router.post('/signup',signup)
router.get('/signin', signin)

module.exports = router