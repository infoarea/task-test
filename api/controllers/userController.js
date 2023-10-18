import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { sendMail } from "../utils/sendMail.js";
import { cloudPublicId } from "../helper/helpers.js";
import {
  cloudinaryImageDelete,
  cloudinaryUpload,
} from "../utils/cloudinary.js";

/**
 * @desc get all users data
 * @route GET /users
 * @access PUBLIC
 */
export const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate("role");

  if (!users?.length) {
    return res.status(400).json({ message: "Not user found" });
  }

  res.status(200).json(users);
});

/**
 * @desc get Single users data
 * @route GET /users/:id
 * @access PUBLIC
 */
export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password").lean();

  if (!user) {
    return res.status(400).json({ message: "No user found" });
  }

  res.json(user);
});

/**
 * @desc create new user
 * @route POST /users
 * @access PUBLIC
 */
export const createUser = asyncHandler(async (req, res) => {
  // get data
  const { name, email, password, role } = req.body;

  // check validation
  if (!name || !password || !email || !role) {
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
  const user = await User.create({ name, email, password: hash, role });

  //send user access to email
  sendMail({
    to: email,
    sub: "Account access info",
    msg: `Your account login access is ${email} and password is ${password}`,
  });
  // check
  if (user) {
    return res
      .status(201)
      .json({ message: `${name} User created successful`, user });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

/**
 * @desc delete user data
 * @route DELETE /users/:id
 * @access PUBLIC
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(400).json({ message: "User delete failed" });
  }

  res.json(user);
});

/**
 * @desc update user data
 * @route PATCH /users/:id
 * @access PUBLIC
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, email, password, role, mobile, address, birth } = req.body;

  // validation
  if (!name || !email || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  user.name = name;
  user.email = email;
  user.mobile = mobile ?? mobile;
  user.address = address ?? address;
  user.birth = birth ?? birth;
  // user.password = await bcrypt.hash(password, 10);
  user.role = role;

  const updateUserData = await user.save();

  res.json({ message: `User updated successfull`, user: updateUserData });
});

/**
 * @desc update user data
 * @route PATCH /users/:id
 * @access PUBLIC
 */
export const updateUserPassword = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { password, newpassword, confirmpassword } = req.body;

  // validation
  if (!password || !newpassword || !confirmpassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (newpassword !== confirmpassword) {
    return res.status(400).json({ message: "Password Not Match!" });
  }

  const user = await User.findById(id).exec();

  //password check
  const passCheck = await bcrypt.compare(password, user.password);

  if (!passCheck) {
    res.status(400).json({ message: "Wrong password" });
  }

  user.password = await bcrypt.hash(newpassword, 10);

  const updateUserData = await user.save();

  res.json({ message: `Password Updated Successfully`, user: updateUserData });
});

/**
 * @desc update user status
 * @route PATCH /user-status/:id
 * @access PUBLIC
 */
export const updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const user = await User.findByIdAndUpdate(id, { status }, { new: true });

  res.status(200).json({
    message: `User status updated successfull`,
    user: user,
  });
});

/**
 * @desc update Profile image
 * @route PATCH /:id
 * @access PUBLIC
 */
export const updateProfilePicture = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userProfile = await User.findById(id);

  //Previous logo
  let updatePhoto = userProfile.photo;

  if (req.file) {
    //Brand logo delete
    const publicId = cloudPublicId(
      userProfile.photo ? userProfile.photo : "123"
    );
    await cloudinaryImageDelete(publicId);
    const photo = await cloudinaryUpload(req);
    updatePhoto = photo.secure_url;
  }

  userProfile.photo = updatePhoto;

  userProfile.save();

  res.status(200).json({
    message: `Profile picture updated successfully`,
    user: userProfile,
  });
});
