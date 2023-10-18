import Tag from "../models/Tag.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { createSlug } from "../helper/createSlug.js";

/**
 * @desc get all tag data
 * @route GET /tag
 * @access PUBLIC
 */
export const getAllTag = asyncHandler(async (req, res) => {
  const tag = await Tag.find().select("-password").lean();

  // if (!tags?.length) {
  //   return res.status(400).json({ message: "tag Not found" });
  // }

  if (tag.length > 0) {
    res.json({ tag, message: "Get All tags" });
  }
  res.json({ message: "No tags found" });
});

/**
 * @desc get Single tag data
 * @route GET /tag/:id
 * @access PUBLIC
 */
export const getSingleTag = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tag = await Tag.findById(id).select("-password").lean();

  if (!tag) {
    return res.status(400).json({ message: "Single tag not found" });
  }

  res.json(tag);
});

/**
 * @desc create new tag
 * @route POST /tag
 * @access PUBLIC
 */
export const createTag = asyncHandler(async (req, res) => {
  // get data
  const { name } = req.body;

  // check validation
  if (!name) {
    return res.status(400).json({ message: "Name field is required" });
  }

  // tag Check
  const tagCheck = await Tag.findOne({ name });

  if (tagCheck) {
    return res.status(400).json({ message: "tag already exists" });
  }

  // create new tag data
  const tag = await Tag.create({
    name,
    slug: createSlug(name),
  });

  // check
  if (tag) {
    return res.status(201).json({ tag, message: "tag created successful" });
  } else {
    return res.status(400).json({ message: "Invalid tag data" });
  }
});

/**
 * @desc delete tag data
 * @route DELETE /:id
 * @access PUBLIC
 */
export const deleteTag = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tag = await Tag.findByIdAndDelete(id);

  if (!tag) {
    return res.status(400).json({ message: "tag delete failed" });
  }

  res.status(200).json({ tag, message: "tag delete successful" });
});

/**
 * @desc update tag data
 * @route PATCH /:id
 * @access PUBLIC
 */
export const updateTag = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "tag name is required" });
  }

  const tag = await Tag.findByIdAndUpdate(
    id,
    { name, slug: createSlug(name) },
    { new: true }
  );

  res.status(200).json({
    message: `tag updated successfull`,
    tag: tag,
  });
});

/**
 * @desc update tag status
 * @route PATCH /tag/:id
 * @access PUBLIC
 */
export const updateTagStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const tag = await Tag.findByIdAndUpdate(id, { status }, { new: true });

  res.status(200).json({
    message: `tag status updated successfull`,
    tag: tag,
  });
});
