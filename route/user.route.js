const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const { authentication } = require("../middleare/user.jwt")
const bcrypt=require('bcrypt');

//alluser
userRouter.get("/alluser",async(req,res)=>{
    try{
        const data =await UserModel.find();
        res.send(data);




    }catch(err){
        res.send(err);
    }
})

//registration
userRouter.post("/register",async(req,res)=>{
    const {email,password,name}=req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=> {



            const user=new UserModel({email,password:hash,name})
            
            res.status(200).send(await user.save())
        });
    
   }catch(err){
    res.status(400).send({"msg":err.message})
   }
})

//login
userRouter.post("/login",async(req,res)=>{ 
    const {email,password}=req.body

    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err, result)=>{
        if(result){
            res.status(200).send({"msg":"Login Sucessfully","token":jwt.sign({ "userID":user._id }, 'pranay')})

            
            }else{
                res.status(400).send({"msg":"Login Failed"})
                console.log(err) 
            }
        });
    }
        
   
       }catch(err){
        res.status(400).send({"msg":"LogIn Failed"})
       }
})



module.exports={userRouter}