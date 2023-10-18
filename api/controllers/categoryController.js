import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { createSlug } from "../helper/createSlug.js";
import {
  cloudinaryImageDelete,
  cloudinaryUpload,
} from "../utils/cloudinary.js";
import { cloudPublicId } from "../helper/helpers.js";

/**
 * @desc get all category data
 * @route GET /category
 * @access PUBLIC
 */
export const getAllCategory = asyncHandler(async (req, res) => {
  const category = await Category.find().populate([
    {
      path: "subCategory",
      populate: {
        path: "subCategory",
        populate: {
          path: "subCategory",
        },
      },
    },
    {
      path: "parentCategory",
      populate: {
        path: "parentCategory",
        populate: {
          path: "parentCategory",
        },
      },
    },
  ]);

  // if (!categorys?.length) {
  //   return res.status(400).json({ message: "category Not found" });
  // }

  if (category.length > 0) {
    res.json({ category, message: "Get All categorys" });
  }
  res.json({ message: "No categorys found" });
});

/**
 * @desc get Single category data
 * @route GET /category/:id
 * @access PUBLIC
 */
export const getSingleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate([
    {
      path: "subCategory",
      populate: {
        path: "subCategory",
        populate: {
          path: "subCategory",
        },
      },
    },
    {
      path: "parentCategory",
      populate: {
        path: "parentCategory",
        populate: {
          path: "parentCategory",
        },
      },
    },
  ]);

  if (!category) {
    return res.status(400).json({ message: "Single category not found" });
  }

  res.json(category);
});

/**
 * @desc create new category
 * @route POST /category
 * @access PUBLIC
 */
export const createCategory = asyncHandler(async (req, res) => {
  // get data
  const { name, parentCategory, icon } = req.body;

  // check validation
  if (!name) {
    return res.status(400).json({ message: "Name field is required" });
  }

  // category Check
  const categoryCheck = await Category.findOne({ name });

  if (categoryCheck) {
    return res.status(400).json({ message: "category already exists" });
  }

  let catIcon = null;
  if (icon) {
    catIcon = icon;
  }

  let catPhoto = null;

  if (req.file) {
    const cat = await cloudinaryUpload(req);
    catPhoto = cat.secure_url;
  }
  // create new category data
  const category = await Category.create({
    name,
    slug: createSlug(name),
    parentCategory: parentCategory ? parentCategory : null,
    icon: catIcon,
    photo: catPhoto,
  });

  if (parentCategory) {
    const parent = await Category.findByIdAndUpdate(parentCategory, {
      $push: { subCategory: category._id },
    });
  }

  // check
  if (category) {
    return res
      .status(201)
      .json({ message: "category created successful", category });
  } else {
    return res.status(400).json({ message: "Invalid category data" });
  }
});

/**
 * @desc delete category data
 * @route DELETE /:id
 * @access PUBLIC
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (category.photo) {
    await cloudinaryImageDelete(cloudPublicId(category.photo));
  }
  if (!category) {
    return res.status(400).json({ message: "category delete failed" });
  }

  res.status(200).json({ category, message: "category delete successful" });
});

/**
 * @desc update category data
 * @route PATCH /:id
 * @access PUBLIC
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, icon } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "category name is required" });
  }

  const catUpdate = await Category.findById(id);

  //Category icon update
  let catIcon = catUpdate.icon;
  if (icon) {
    catIcon = icon;
  }
  //Category Photo update
  let catPhoto = catUpdate.photo;
  if (req.file) {
    await cloudinaryImageDelete(cloudPublicId(catUpdate.photo));
    const photo = await cloudinaryUpload(req);
    catPhoto = photo.secure_url;
  }

  catUpdate.name = name;
  catUpdate.slug = createSlug(name);
  catUpdate.icon = catIcon;
  catUpdate.photo = catPhoto;
  catUpdate.save();

  res.status(200).json({
    message: `category updated successfull`,
    category: catUpdate,
  });
});

/**
 * @desc update category status
 * @route PATCH /users/:id
 * @access PUBLIC
 */
export const updateCategoryStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const category = await Category.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  res.status(200).json({
    message: `category status updated successfull`,
    category: category,
  });
});
