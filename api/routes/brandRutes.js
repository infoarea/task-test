import express from "express";

import tokenVerify from "../middlewares/tokenVerify.js";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  getSingleBrand,
  updateBrand,
  updateBrandStatus,
} from "../controllers/brandController.js";
import { brandLogo } from "../utils/multer.js";

const router = express.Router();

router.use(tokenVerify);

// routing
router.route("/").get(getAllBrand).post(brandLogo, createBrand);
router
  .route("/:id")
  .get(getSingleBrand)
  .delete(deleteBrand)
  .put(brandLogo, updateBrand)
  .patch(brandLogo, updateBrand);
router.route("/brand-status/:id").patch(updateBrandStatus);
router.route("/brand-status/:id").put(updateBrandStatus);
// export
export default router;
