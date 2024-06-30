const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:String,
    email:{type: String, required: true,unique:true},
    password:String,
    referalCode:String,
    referalCodeType:String,
    points:Number,
    about:Object,
    solved:[String],
    likedProblems :[String],
    dislikedProblems :[String],
    ReferelCount:Number
})

 const userModel = mongoose.model("UserData",userSchema)
 module.exports=userModel
