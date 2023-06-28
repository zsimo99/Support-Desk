const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please add ur name"]
    },
    email:{
        type:String,
        required:[true,"please enter a email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please add a password"]
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true
})

module.exports=mongoose.model("User",userSchema)