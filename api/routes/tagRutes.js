import express from "express";

import tokenVerify from "../middlewares/tokenVerify.js";
import {
  createTag,
  deleteTag,
  getAllTag,
  getSingleTag,
  updateTag,
  updateTagStatus,
} from "../controllers/tagController.js";

const router = express.Router();

router.use(tokenVerify);

// routing
router.route("/").get(getAllTag).post(createTag);
router
  .route("/:id")
  .get(getSingleTag)
  .delete(deleteTag)
  .put(updateTag)
  .patch(updateTag);
router.route("/tag-status/:id").patch(updateTagStatus);
router.route("/tag-status/:id").put(updateTagStatus);
// export
export default router;
