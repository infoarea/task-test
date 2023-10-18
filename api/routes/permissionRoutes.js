import express from "express";

import tokenVerify from "../middlewares/tokenVerify.js";
import {
  createPermission,
  deletePermission,
  getAllPermission,
  getSinglePermission,
  updatePermission,
  updatePermissionStatus,
} from "../controllers/permissionContoller.js";

const router = express.Router();

router.use(tokenVerify);

// routing
router.route("/").get(getAllPermission).post(createPermission);
router
  .route("/:id")
  .get(getSinglePermission)
  .delete(deletePermission)
  .put(updatePermission);
router.route("/permission-status/:id").patch(updatePermissionStatus);
// export
export default router;
