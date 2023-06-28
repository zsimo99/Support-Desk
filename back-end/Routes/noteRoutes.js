const express=require("express")
const router=express.Router({mergeParams:true})
const {protect} =require("../middlewares/authMiddleware")
const {getNotes,addNote}=require("../Controllers/noteControllers")

router.route("").get(protect,getNotes).post (protect,addNote)
module.exports=router