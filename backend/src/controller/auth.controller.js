import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import interviewModel from "../models/interviewReport.model.js";

// signup controller
async function signupController(req, res) {
  let { username, email, password } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "username or email or password cannot be empty" });
  }

  // check in DB
  let isExist = await userModel
    .findOne({ $or: [{ email }, { username }] })
    .select("+password");

  if (isExist) {
    return res
      .status(400)
      .json({ message: "Username or email already exists" });
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
  let token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
  );

  // set cookie
  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully",
    user: { username: user.username, email: user.email },
  });
}

// login controller
async function loginController(req, res) {
  try {
    let { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "username and password required" });
    }
    // check user exist
    let userexist = await userModel.findOne({ email }).select("+password");

    if (!userexist) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // match password
    let passwordMatch = await bcrypt.compare(password, userexist.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Password is wrong" });
    }

    // create token
    let token = jwt.sign(
      { id: userexist._id, username: userexist.username },
      process.env.JWT_SECRET,
    );

    // set cookie
    res.cookie("token", token);

    return res.status(200).json({
      message: "User login successfully",
      user: {
        username: userexist.username,
        email: userexist.email,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function logout(req, res) {
  res.cookie("token", "");
  return res.status(200).json({ message: "User logged out successfully" });
}

async function Getme(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token in cookies" });
  }

  // verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let user = await userModel.findById(decoded.id);

  return res.json({
    message: "crr user",
    user: { username: user.username, email: user.email },
  });
}

async function getreportdata(req, res) {
  try {
    const userId = req.user.id;

    const report = await interviewModel.find({ user: userId }).select("-jobDescription -resume -selfDescription");
    res.json({
      report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

export default {loginController,signupController,logout,Getme,getreportdata,};
