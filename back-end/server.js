const express=require("express")
const {errorHandler}=require("./middlewares/errormiddleware")
const connectDB = require("./config/db")
require("colors")
require("dotenv").config()
const PORT=process.env.PORT || 5000

connectDB()
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.status(200).json({message:"welcome to the support desk api"})
})
// Routes 
app.use("/api/users",require("./Routes/userRoutes"))
app.use("/api/tickets",require("./Routes/ticketRoutes"))
app.use(errorHandler)


app.listen(PORT,()=>console.log("server is running in port : "+PORT))