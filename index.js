const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./route/user.route")
const {noteRouter}=require("./route/note.route")
const {authentication}=require("../backed/middleare/user.jwt")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors())




app.use("/user",userRouter)
app.use(authentication)
app.use("/notes",noteRouter)


app.listen(9898,async(req,res)=>{
    try{
        await connection
        
        console.log("connected to db 9898");
    }catch(err){
        console.log(err);
    }
})