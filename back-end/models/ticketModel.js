const mongoose=require("mongoose")

const ticketSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    product:{
        type:String,
        required:[true,"please select a product"],
        enum:["iPhone","iPad","iMac","Mackbook Pro"]
    },
    description:{
        type:String,
        required:[true,"please add a description of the issue"]
    },
    status:{
        type:String,
        required:true,
        enum:["new","open","closed"],
        default:"new"
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Ticket",ticketSchema)