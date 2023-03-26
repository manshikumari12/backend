const  mongoose = require("mongoose")

const userSchema=mongoose.Schema({
    email:String,
    password:String,
    name:String,
    
},{
    versionkey:false,
})

const UserModel=mongoose.model("user",userSchema)

module.exports={
UserModel
}