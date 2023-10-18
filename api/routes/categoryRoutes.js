import express from "express";

import tokenVerify from "../middlewares/tokenVerify.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  updateCategoryStatus,
} from "../controllers/categoryController.js";
import { categoryPhoto } from "../utils/multer.js";

const router = express.Router();

router.use(tokenVerify);

// routing
router.route("/").get(getAllCategory).post(categoryPhoto, createCategory);
router
  .route("/:id")
  .get(getSingleCategory)
  .delete(deleteCategory)
  .put(categoryPhoto, updateCategory)
  .patch(categoryPhoto, updateCategory);
router.route("/category-status/:id").patch(updateCategoryStatus);
// export
export default router;
