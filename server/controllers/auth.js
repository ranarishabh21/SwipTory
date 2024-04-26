const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
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
    const token = jwt.sign({ username: username }, process.env.SECRET_KEY, {
      expiresIn: "10d",
    });
    res.cookie("token", token, { httpOnly: true});

    res.status(201).json({
      success: true,
      token,
      username: username,
      userId: user._id,
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({ errorMessage: "Something went wrong!, Error in Registering " });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json("Please provide username and password");
    }

    const user = await User.findOne({ username });

    if (!user) {
      res.status(400).json("User does not exist, Please register");
    } else {
      //  comparsion
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched) {
        return res.status(401).json("Invalid credentials");
      }

      // token
      const token = jwt.sign({ username: username }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });

      res.cookie("token", token, { httpOnly: true });

      res.status(200).json({
        success: true,
        token,
        username: username,
        userId: user._id,
        user,
      });
    }
  } catch (error) {
    // next(new Error("Error logging in user"));
    res.json({ errorMessage: "Something went wrong,error in logging" });
  }
};

const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    // next(new Error("Error logging out user"));
    res.json({
      errorMessage: "Something went wrong,Error in logging out the user",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
