const problemModel = require("../model/Problem");

const addProblem = async(req,res) =>{
try {
    const {Challenge , Difficulty , Network , ProblemStatement , ProblemNumber , Instructions , Constraints , Output , BoilerPlate , Hints} = req.body

    const newProblem = {
        Challenge,
        Difficulty,
        Network,
        ProblemStatement,
        ProblemNumber,
        Instructions,
        Constraints,
        Output,
        BoilerPlate,
        Hints
    }

    const saveData = await problemModel.create(newProblem)

    return res.status(200).json(saveData);
} catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
}
}


const getAllProblem = async(req,res) =>{
try {
    const data = await problemModel.find()
    return res.status(200).json(data)
} catch (error) {
    return res.status(400).json({ error: error.message });
}
}


const updateProblem = async(req,res) =>{
    try {
        const {id} = req.params;

        const data = req.body;
  
        const updateItem  = await problemModel.findByIdAndUpdate(id.trim(),data,{
          new :data
        })
  
        if(!updateItem){
          return res.status(404).json({message:"User need to loged In"})
        }
        return res.status(200).json({updateItem})
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports={
    addProblem,
    getAllProblem,
    updateProblem
}