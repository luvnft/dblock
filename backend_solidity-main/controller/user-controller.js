const userModel = require("../model/User");
const bcrypt = require('bcryptjs');


function generateRandomString(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  }

const createUser = async (req, res) => {
    try {
      const { userName, email, password, referalCodeType } = req.body;

      const existingUser = await userModel.findOne({ $or: [{ userName }, { email }] });
      if (existingUser) {
        return res.status(409).json({ error: 'User name or email already exists' });
      }
  
      const referralCode = referalCodeType || '';
  
      const points = referralCode.length > 0 ? 1 : 0;

      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = {
        userName,
        email,
        password:hashedPassword,
        referalCode: generateRandomString(),
        referalCodeType: referralCode,
        points ,
        ReferelCount: 0
      };
  
      const createdUser = await userModel.create(newUser);
  
      if (referralCode.length > 0) {
        const referringUser = await userModel.findOne({ referalCode: referralCode });
  
        if (referringUser) {
  
          referringUser.points = referringUser.points ? referringUser.points + 1 : 1;
          referringUser.ReferelCount = referringUser.ReferelCount ? referringUser.ReferelCount + 1 : 1 ;
          await referringUser.save();
        }
        else{
          return res.status(400).json("wrong Referal Code");
        }
      }
  
      return res.status(200).json(createdUser);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  };


 const getUser = async(req,res)=>{
    try {
      const data = await userModel.find();
      return res.status(200).json(data)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  const getUserById = async(req,res)=>{
    try {
      const {id} = req.params;

      const fetchedData = await userModel.findById(id)
      if (!fetchedData) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({fetchedData})

    } catch (error) {
      return res.status(400).json(error)
    }
  }

  const updateUserByPoints = async(req,res) =>{
    
      const { id } = req.params;
      const { points } = req.body;
  
      try {
          const user = await userModel.findById(id);
          if (!user) {
              return res.status(404).json({ error: "User not found" });
          }

          
  
          // Add the points to the user's current points
          user.points += points;
          await user.save();
  
        return  res.json({ message: "Points updated successfully" });
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  // const handleDone = async() => {
  //   try {
      
  //   } catch (error) {
  //     return res.status(400).json(error)
  //   }
  // }


  const updateUser = async (req,res)=>{
    try {
      const {id} = req.params;

      const data = req.body;

      const updateItem  = await userModel.findByIdAndUpdate(id.trim(),data,{
        new :data
      })

      if(!updateItem){
        return res.status(404).json({message:"User need to loged In"})
      }

      return res.status(200).json({updateItem})
    } catch (error) {
      return res.status(400).json({error})
    }
  }

  const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await userModel.findOne({ userName: username });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                res.json({ user });
            } else {
                res.status(401).json("Username or password is incorrect");
            }
        } else {
            res.status(404).json("User not found");
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updateUserByReferalPoints = async(req,res) =>{
    
  const { id } = req.params;
  const { points } = req.body;
  const {ReferelCount} = req.body

  try {
      const user = await userModel.findById(id);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      // Add the points to the user's current points
      user.points += points;
      user.ReferelCount=ReferelCount;
      await user.save();

    return  res.json({ message: "Points updated successfully" });
} catch (error) {
  return res.status(400).json(error)
}
}


  module.exports = {
    createUser,
    getUser,
    updateUser,
    loginUser,
    getUserById,
    updateUserByPoints,
    updateUserByReferalPoints
  };