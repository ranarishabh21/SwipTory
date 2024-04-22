const User = require("../models/Users")
const bcrypt = require("bcrypt");



const registerUser = async (req,res,next) =>{
    try {
        const { username, password } = req.body;

        if (!username || !password) {
          return res.status(400).json("Please provide username and password");
        }

        const existedUser = await User.findOne({ username });

    if (existedUser) {
      return res.status(400).json("User already exists");
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();
        



    } catch (error) {
        console.log(error);
        res.json({errorMessage : "Something went wrong"})
        
    }
}



const loginUser = async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json("Please provide username and password");
      }
  
      const user = await User.findOne({ username });
  
      if (!user) {
        res.status(400).json("User does not exist");
      } else {
        //  compare password
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) {
          return res.status(401).json("Invalid credentials");
        }

        res.json("User logged In");
  
      }
    } catch (error) {
      next(new Error("Error logging in user"));
    }
  };


module.exports = {registerUser,loginUser}