import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { createSlug } from "../helper/createSlug.js";
import {
  cloudinaryImageDelete,
  cloudinaryUpload,
  cloudinaryUploads,
} from "../utils/cloudinary.js";
import { cloudPublicId } from "../helper/helpers.js";

/**
 * @desc get all product data
 * @route GET /product
 * @access PUBLIC
 */
export const getAllProduct = asyncHandler(async (req, res) => {
  const product = await Product.find();

  // if (!products?.length) {
  //   return res.status(400).json({ message: "product Not found" });
  // }

  if (product.length > 0) {
    res.json(product);
  }
  res.json({ message: "Products not found" });
});

/**
 * @desc get Single product data
 * @route GET /product/:id
 * @access PUBLIC
 */
export const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(400).json({ message: "Single product not found" });
  }

  res.json(product);
});

/**
 * @desc create new product
 * @route POST /product
 * @access PUBLIC
 */
export const createProduct = asyncHandler(async (req, res) => {
  // get data
  const {
    name,
    productType,
    productSimple,
    productVariable,
    productGroup,
    productExternal,
    shortDesc,
    longDesc,
    specification,
    reviews,
    categories,
    tags,
    brand,
  } = req.body;

  // check validation
  if (!name) {
    return res.status(400).json({ message: "Name field is required" });
  }

  // product Check
  const productCheck = await Product.findOne({ name });

  if (productCheck) {
    return res.status(400).json({ message: "product already exists" });
  }

  let productPhotos = [];
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const fileData = await cloudinaryUploads(req.files[i].path);
      productPhotos.push(fileData);
    }
  }

  const simpleProductData = JSON.parse(productSimple);

  // // create new product data
  const product = await Product.create({
    name,
    slug: createSlug(name),
    productType,
    productSimple:
      productType === "simple" ? { ...simpleProductData, productPhotos } : null,
    productVariable: productType === "variable" ? productVariable : null,
    productGroup: productType === "group" ? productGroup : null,
    productExternal: productType === "external" ? productExternal : null,
    shortDesc,
    longDesc,
  });

  // check
  if (product) {
    return res
      .status(201)
      .json({ message: "product created successful", product });
  } else {
    return res.status(400).json({ message: "Invalid product data" });
  }
});

/**
 * @desc delete product data
 * @route DELETE /:id
 * @access PUBLIC
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(400).json({ message: "product delete failed" });
  }

  if (product.logo) {
    //product logo delete
    const publicId = cloudPublicId(product.logo);
    await cloudinaryImageDelete(publicId);
  }

  res.status(200).json({ product, message: "product delete successful" });
});

/**
 * @desc update product data
 * @route PATCH /:id
 * @access PUBLIC
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "product name is required" });
  }

  const brndUpdate = await Product.findById(id);

  //Previous logo
  let updateLogo = brndUpdate.logo;

  if (req.file) {
    //product logo delete
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
    message: `product updated successfull`,
    product: brndUpdate,
  });
});

/**
 * @desc update product status
 * @route PATCH /users/:id
 * @access PUBLIC
 */
export const updateProductStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const product = await Product.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  res.status(200).json({
    message: `product status updated successfull`,
    product: product,
  });
});
