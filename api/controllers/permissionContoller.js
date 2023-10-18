import Permission from "../models/Permission.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { createSlug } from "../helper/createSlug.js";

/**
 * @desc get all Permission data
 * @route GET /Permission
 * @access PUBLIC
 */
export const getAllPermission = asyncHandler(async (req, res) => {
  const permissions = await Permission.find().select("-password").lean();

  // if (!permissions?.length) {
  //   return res.status(400).json({ message: "Permission Not found" });
  // }

  if (permissions.length > 0) {
    res.json(permissions);
  }
});

/**
 * @desc get Single Permission data
 * @route GET /Permission/:id
 * @access PUBLIC
 */
export const getSinglePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const permission = await Permission.findById(id).select("-password").lean();

  if (!permission) {
    return res.status(400).json({ message: "Single Permission not found" });
  }

  res.json(permission);
});

/**
 * @desc create new Permission
 * @route POST /Permission
 * @access PUBLIC
 */
export const createPermission = asyncHandler(async (req, res) => {
  // get data
  const { name } = req.body;

  // check validation
  if (!name) {
    return res.status(400).json({ message: "Name field is required" });
  }

  // Permission Check
  const permissionCheck = await Permission.findOne({ name });

  if (permissionCheck) {
    return res.status(400).json({ message: "Permission already exists" });
  }

  // create new permission data
  const permission = await Permission.create({ name, slug: createSlug(name) });

  // check
  if (permission) {
    return res
      .status(201)
      .json({ permission, message: "Permission created successful" });
  } else {
    return res.status(400).json({ message: "Invalid permission data" });
  }
});

/**
 * @desc delete permission data
 * @route DELETE /:id
 * @access PUBLIC
 */
export const deletePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const permission = await Permission.findByIdAndDelete(id);

  if (!permission) {
    return res.status(400).json({ message: "Permission delete failed" });
  }

  res.status(200).json({ permission, message: "Permission delete successful" });
});

/**
 * @desc update Permission data
 * @route PATCH /users/:id
 * @access PUBLIC
 */
export const updatePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Permission name is required" });
  }

  const permission = await Permission.findByIdAndUpdate(
    id,
    { name, slug: createSlug(name) },
    { new: true }
  );

  res.status(200).json({
    message: `Permission updated successfull`,
    permission: permission,
  });
});

/**
 * @desc update permission status
 * @route PATCH /users/:id
 * @access PUBLIC
 */
export const updatePermissionStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const permission = await Permission.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  res.status(200).json({
    message: `Permission status updated successfull`,
    permission: permission,
  });
});
