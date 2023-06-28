const asyncHandler = require('express-async-handler')
const bcrypt=require("bcryptjs")
const jwt =require("jsonwebtoken")
const User=require("../models/userModel")

//@desc Register a new user
//@route /api/users
//@access public
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    if(!name,!email,!password){
        res.status(400)
        throw new Error("please include all fields")
    }
    // find if user alredy exists
    const userExists= await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("email already use")
    }
    // hash password 
    const salt=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(password,salt)

    // cerate user 
    const user=await User.create({
        name,email,password:hashPassword
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("invalid user data")
    }
})

//@desc login a user
//@route /api/users/login
//@access public
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const user=await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("invalid credentials ")
    }
})

//@desc get current user
//@route /api/users/login/me
//@access privet
const getMe=asyncHandler(async(req,res)=>{
    res.json(req.user)
})

// generate token 
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
}
module.exports={
    registerUser,
    loginUser,
    getMe
}