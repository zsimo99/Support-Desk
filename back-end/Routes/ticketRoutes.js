const express=require("express")
const { protect } = require("../middlewares/authMiddleware")
const noteRoute=require("./noteRoutes")
const router=express.Router()
router.use("/:ticketId/notes",noteRoute)
const {getTickets,createTicket,getTicket, updateTicket, deleteTicket} =require("../Controllers/ticketControllers")

router.route("/").get(protect,getTickets).post(protect,createTicket)
router.route("/:id").get(protect,getTicket).delete(protect,deleteTicket).put(protect,updateTicket)

module.exports=router