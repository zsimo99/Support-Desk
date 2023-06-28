const jwt =require("jsonwebtoken")
const User=require("../models/userModel")
const asyncHandler=require("express-async-handler")
const name="ahmed"

const protect = asyncHandler(async(req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            // get token 
            token =req.headers.authorization.split(" ")[1]
            // verify token 
            const decode=jwt.verify(token,process.env.JWT_SECRET)

            req.user=await User.findById(decode.id).select("name email _id")
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Autorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not Autorized')
    }
})
module.exports={protect}