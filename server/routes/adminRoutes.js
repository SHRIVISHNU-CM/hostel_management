const {signup,signin} = require('../controller/adminController')
const express = require("express")
const router = express.Router()

router.post("/signup",signup)
router.post("/signin",signin)

module.exports = router