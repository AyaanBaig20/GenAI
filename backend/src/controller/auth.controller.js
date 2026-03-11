import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// signup controller 
async function signupController(req, res) {
  let { username, email, password } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "username or email or password cannot be empty" });
  }

  // check in DB
  let isExist = await userModel.findOne({ $or: [{ email }, { username }] });

  if (isExist) {
    return res.status(400).json({ message: "Username or email already exists" });
  }

  // hash password
  let hash = await bcrypt.hash(password, 10);

  // create user
  let user = await userModel.create({
    username,
    email,
    password: hash,
  });

  // create token
  let token = jwt.sign({ id: user._id ,username:user.username}, process.env.JWT_SECRET);

  // set cookie
  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully",
    user: { username: user.username, email: user.email },
  });
} 

// login controller 
async function loginController(req, res) {
  let { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({message:"username and password required"})
  }
  // check user exist
  let userexist = await userModel.findOne({ email });

  if (!userexist) {
    return res.status(400).json({ message: "User does not exist" });
  }

  // match password
  let passwordMatch = await bcrypt.compare(password, userexist.password);

  if (!passwordMatch) {
    return res.status(400).json({ message: "Password is wrong" });
  }

  // create token
  let token = jwt.sign({ id: userexist._id ,username:userexist.username}, process.env.JWT_SECRET);

  // set cookie
  res.cookie("token", token);

  return res.status(200).json({
    message: "User login successfully",
    user: {
      username: userexist.username,
      email: userexist.email,
    },
  });
}

async function logout(req, res) {
  res.cookie("token", "");
  return res.status(200).json({message: "User logged out successfully",});
}
export default {loginController,signupController,logout}