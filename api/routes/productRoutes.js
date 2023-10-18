import express from "express";

import tokenVerify from "../middlewares/tokenVerify.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  updateProductStatus,
} from "../controllers/productController.js";
import { productPhoto } from "../utils/multer.js";

const router = express.Router();

router.use(tokenVerify);

// routing
router.route("/").get(getAllProduct).post(productPhoto, createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .delete(deleteProduct)
  .put(updateProduct)
  .patch(updateProduct);
router.route("/product-status/:id").patch(updateProductStatus);
// export
export default router;
