import Brand from "../models/Brand.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { createSlug } from "../helper/createSlug.js";
import {
  cloudinaryImageDelete,
  cloudinaryUpload,
} from "../utils/cloudinary.js";
import { cloudPublicId } from "../helper/helpers.js";

/**
 * @desc get all brand data
 * @route GET /brand
 * @access PUBLIC
 */
export const getAllBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.find().select("-password").lean();

  // if (!brands?.length) {
  //   return res.status(400).json({ message: "brand Not found" });
  // }

  if (brand.length > 0) {
    res.json({ brand, message: "Get All Brands" });
  }
  res.json({ message: "No brands found" });
});

/**
 * @desc get Single brand data
 * @route GET /brand/:id
 * @access PUBLIC
 */
export const getSingleBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const brand = await Brand.findById(id).select("-password").lean();

  if (!brand) {
    return res.status(400).json({ message: "Single brand not found" });
  }

  res.json(brand);
});

/**
 * @desc create new brand
 * @route POST /brand
 * @access PUBLIC
 */
export const createBrand = asyncHandler(async (req, res) => {
  // get data
  const { name } = req.body;

  // check validation
  if (!name) {
    return res.status(400).json({ message: "Name field is required" });
  }

  // brand Check
  const brandCheck = await Brand.findOne({ name });

  if (brandCheck) {
    return res.status(400).json({ message: "brand already exists" });
  }

  let brandLogo = null;

  if (req.file) {
    brandLogo = await cloudinaryUpload(req);
  }

  // create new brand data
  const brand = await Brand.create({
    name,
    slug: createSlug(name),
    logo: brandLogo?.secure_url ? brandLogo?.secure_url : null,
  });

  // check
  if (brand) {
    return res.status(201).json({ message: "brand created successful", brand });
  } else {
    return res.status(400).json({ message: "Invalid brand data" });
  }
});

/**
 * @desc delete brand data
 * @route DELETE /:id
 * @access PUBLIC
 */
export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) {
    return res.status(400).json({ message: "brand delete failed" });
  }

  if (brand.logo) {
    //Brand logo delete
    const publicId = cloudPublicId(brand.logo);
    await cloudinaryImageDelete(publicId);
  }

  res.status(200).json({ brand, message: "brand delete successful" });
});

/**
 * @desc update brand data
 * @route PATCH /:id
 * @access PUBLIC
 */
export const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "brand name is required" });
  }

  const brndUpdate = await Brand.findById(id);

  //Previous logo
  let updateLogo = brndUpdate.logo;

  if (req.file) {
    //Brand logo delete
    const publicId = cloudPublicId(brndUpdate.logo);
    await cloudinaryImageDelete(publicId);
    const logo = await cloudinaryUpload(req);
    updateLogo = logo.secure_url;
  }

  brndUpdate.name = name;
  brndUpdate.slug = createSlug(name);
  brndUpdate.logo = updateLogo;

  brndUpdate.save();

  res.status(200).json({
    message: `brand updated successfull`,
    brand: brndUpdate,
  });
});

/**
 * @desc update brand status
 * @route PATCH /users/:id
 * @access PUBLIC
 */
export const updateBrandStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const brand = await Brand.findByIdAndUpdate(id, { status }, { new: true });

  res.status(200).json({
    message: `brand status updated successfull`,
    brand: brand,
  });
});
