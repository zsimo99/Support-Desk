const asyncHandler = require('express-async-handler')
const Ticket=require("../models/ticketModel")
const User=require("../models/userModel")

//@desc get tickets
//@route Get /api/tickets
//@access privet
const getTickets=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error("user not found")
    }
    const tickets=await Ticket.find({user:user._id})

    res.status(200).json(tickets)
})


//@desc get ticket
//@route Get /api/tickets/:id
//@access privet
const getTicket=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error("user not found")
    }
    const ticket=await Ticket.findOne({_id:req.params.id,user:user._id})

    if(!ticket){
        res.status(404)
        throw new Error("ticket not found")
    }
    
    res.status(200).json(ticket)
})


//@desc delete ticket
//@route Delete /api/tickets/:id
//@access privet
const deleteTicket=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error("user not found")
    }
    const ticket=await Ticket.findOne({_id:req.params.id,user:user._id})

    if(!ticket){
        res.status(404)
        throw new Error("ticket not found")
    }
    await Ticket.findByIdAndRemove(req.params.id)
    res.status(200).json({success:true})
})


//@desc update ticket
//@route put /api/tickets/:id
//@access privet
const updateTicket=asyncHandler(async(req,res)=>{
    const  {product,description,status}=req.body
    const user=await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error("user not found")
    }
    const ticket=await Ticket.findOne({_id:req.params.id,user:user._id})

    if(!ticket){
        res.status(404)
        throw new Error("ticket not found")
    }
    const updatedTicket =await Ticket.findByIdAndUpdate(req.params.id,{product,description,status},{new:true})
    res.status(200).json({updatedTicket})
})


//@desc get tickets
//@route Post /api/tickets
//@access privet
const createTicket=asyncHandler(async(req,res)=>{
    const  {product,description}=req.body
    if(!product || !description){
        res.status(400)
        throw new Error("please add a product and description")
    }
    const user =await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error("user not found")
    }

    const ticket =await Ticket.create({
        description,product,user:user._id,status:"new"
    })
    res.status(201).json(ticket)
})

module.exports={getTickets,createTicket,getTicket,updateTicket,deleteTicket}