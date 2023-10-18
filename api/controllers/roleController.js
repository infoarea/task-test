import Role from "../models/Role.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { createSlug } from "../helper/createSlug.js";

/**
 * @desc get all Role data
 * @route GET /Role
 * @access PUBLIC
 */
export const getAllRole = asyncHandler(async (req, res) => {
  const role = await Role.find().select("-password").lean();

  // if (!roles?.length) {
  //   return res.status(400).json({ message: "Role Not found" });
  // }

  if (role.length > 0) {
    res.json(role);
  }
});

/**
 * @desc get Single Role data
 * @route GET /Role/:id
 * @access PUBLIC
 */
export const getSingleRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const role = await Role.findById(id).select("-password").lean();

  if (!role) {
    return res.status(400).json({ message: "Single Role not found" });
  }

  res.json(role);
});

/**
 * @desc create new Role
 * @route POST /Role
 * @access PUBLIC
 */
export const createRole = asyncHandler(async (req, res) => {
  // get data
  const { name, permissions } = req.body;

  // check validation
  if (!name) {
    return res.status(400).json({ message: "Name field is required" });
  }

  // Role Check
  const roleCheck = await Role.findOne({ name });

  if (roleCheck) {
    return res.status(400).json({ message: "Role already exists" });
  }

  // create new Role data
  const role = await Role.create({ name, slug: createSlug(name), permissions });

  // check
  if (role) {
    return res.status(201).json({ message: "Role created successful", role });
  } else {
    return res.status(400).json({ message: "Invalid Role data" });
  }
});

/**
 * @desc delete Role data
 * @route DELETE /:id
 * @access PUBLIC
 */
export const deleteRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const role = await Role.findByIdAndDelete(id);

  if (!role) {
    return res.status(400).json({ message: "Role delete failed" });
  }

  res.status(200).json({ role, message: "Role delete successful" });
});

/**
 * @desc update Role data
 * @route PATCH /:id
 * @access PUBLIC
 */
export const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, permissions } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Role name is required" });
  }

  const role = await Role.findByIdAndUpdate(
    id,
    { name, slug: createSlug(name), permissions },
    { new: true }
  );

  res.status(200).json({
    message: `Role updated successfull`,
    role: role,
  });
});

/**
 * @desc update Role status
 * @route PATCH /users/:id
 * @access PUBLIC
 */
export const updateRoleStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const role = await Role.findByIdAndUpdate(id, { status }, { new: true });

  res.status(200).json({
    message: `Role status updated successfull`,
    role: role,
  });
});
