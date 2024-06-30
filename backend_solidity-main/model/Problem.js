const mongoose  = require("mongoose");

const problemSchema = new mongoose.Schema({
    Challenge:String,
    Difficulty:String,
    Network:String,
    Theme:String,
    SubTheme:String,
    ProblemStatement :[Object],
    ProblemDescription:String,
    ProblemNumber:Number,
    Instructions:[Object],
    Constraints:[[Object]],
    Output:String,
    BoilerPlate:String,
    Hints: [String] ,
    ByteCode:String
})

 const problemModel = mongoose.model("ProblemData",problemSchema)
 module.exports=problemModel
