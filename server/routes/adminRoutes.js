const {signup,signin,DbRooms,AllRooms,UpdateRoom,DeleteRoomDB} = require('../controller/adminController')
const express = require("express")
const router = express.Router()
const multer = require("../multer")

router.post("/signup",signup)
router.post("/signin",signin)
router.post("/rooms",multer.single("image"),DbRooms)
router.get("/allRooms",AllRooms)
router.put('/roomsUpdate/:id',multer.single("image"),UpdateRoom)
router.delete("/deleteDB/:id",DeleteRoomDB)

module.exports = router