const asyncHandler = require('express-async-handler')
const Ticket=require("../models/ticketModel")
const User=require("../models/userModel")
const Note=require("../models/noteModel")

//@desc get note for a ticket
//@route Get /api/tickets/:ticketId/notes
//@access privet
const getNotes=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error("user not found")
    }
    const ticket=await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString()!==req.user.id){
        res.status(401) 
        throw new Error("Not Authorized")
    }

    const notes=await Note.find({ticket:req.params.ticketId})

    res.status(200).json(notes)
})


//@desc create a  ticket
//@route post /api/tickets/:ticketId/notes
//@access privet
const addNote=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error("user not found")
    }

    const ticket=await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString()!==req.user.id){
        res.status(401) 
        throw new Error("Not Authorized")
    }

    const note=await Note.create({user:user.id,ticket:req.params.ticketId,text:req.body.text})

    res.status(200).json(note)
})

module.exports={getNotes,addNote}