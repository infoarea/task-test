import express from "express";

import tokenVerify from "../middlewares/tokenVerify.js";
import {
  createRole,
  deleteRole,
  getAllRole,
  getSingleRole,
  updateRole,
  updateRoleStatus,
} from "../controllers/roleController.js";

const router = express.Router();

router.use(tokenVerify);

// routing
router.route("/").get(getAllRole).post(createRole);
router.route("/:id").get(getSingleRole).delete(deleteRole).put(updateRole);
router.route("/role-status/:id").patch(updateRoleStatus);
// export
export default router;
