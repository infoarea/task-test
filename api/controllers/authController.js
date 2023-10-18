import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @desc user login system
 * @route POST/login
 * @access PUBLIC
 *
 */
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //validate
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  //Find login user by email
  const loginUser = await User.findOne({ email }).populate("role");

  if (!loginUser) {
    return res.status(400).json({ message: "User not found!" });
  }

  //password check
  const passCheck = await bcrypt.compare(password, loginUser.password);

  if (!passCheck) {
    return res.status(400).json({ message: "Wrong password" });
  }

  //access token
  const accessToken = jwt.sign(
    { email: loginUser.email, role: loginUser.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
  );

  //Refresh token
  // const refreshToken = jwt.sign(
  // {email : loginUser.email},
  // process.env.REFRESH_TOKEN_SECRET,
  // {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN}
  // );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 15,
  });

  res.json({
    token: accessToken,
    user: loginUser,
    message: "User Logged in successfully",
  });
});

/**
 * @desc refresh Token
 * @route GET/refreshToken
 * @access PUBLIC
 *
 */
export const refreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.rToken) {
    return res.status(400).json({ message: "invalid token request" });
  }
  const token = cookies.rToken;

  jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decode) => {
      if (err) {
        return res.status(400).json({ message: "Token not match" });
      }

      const tokenUser = await User.findOne({ email: decode.email });
      if (!tokenUser) {
        return res.status(404).json({ message: "Token user not found" });
      }

      //access token
      const accessToken = jwt.sign(
        { email: tokenUser.email, role: tokenUser.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
      );

      res.status(200).json({ message: accessToken });
    })
  );
};

/**
 * @desc Logout
 * @route POST/logout
 * @access PUBLIC
 *
 */
export const userLogout = (req, res) => {
  const cookies = req.cookies;

  if (!cookies.accessToken) {
    return res.status(400).json({ message: "Already logged out!" });
  }
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
    })
    .json({ message: "Logged out" });
};

/**
 * @desc Register new user
 * @route POST /auth
 * @access PUBLIC
 */
export const userRegister = asyncHandler(async (req, res) => {
  // get data
  const { name, email, password } = req.body;

  // check validation
  if (!name || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // email existance
  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // hash password
  const hash = await bcrypt.hash(password, 10);

  // create new user data
  const user = await User.create({ name, email, password: hash });

  res.status(200).json({
    user,
    message: "User Created successful",
  });
});

/**
 * @desc Logged in user
 * @route POST /auth
 * @access PUBLIC
 */
export const loggedInUser = asyncHandler(async (req, res) => {
  if (!req.me) {
    return res.status(200).json({ message: "User not found" });
  }

  res.status(200).json(req.me);
});
