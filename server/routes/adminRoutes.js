const {signup,signin,DbRooms,AllRooms,UpdateRoom,DeleteRoomDB,contactus,allContact,findOneRoom,findAdmin,adminUpdate} = require('../controller/adminController')
const express = require("express")
const router = express.Router()
const multer = require("../multer")

router.post("/signup",signup)
router.post("/signin",signin)
router.post("/rooms",multer.single("image"),DbRooms)
router.get("/allRooms",AllRooms)
router.get("/room/:id",findOneRoom)
router.get("/admin/:id",findAdmin)
router.put("/adminupdate/:id",adminUpdate)
router.put('/roomsUpdate/:id',multer.single("image"),UpdateRoom)
router.delete("/deleteDB/:id",DeleteRoomDB)
router.post("/contactus",contactus)
router.get("/allContactus",allContact)

module.exports = router