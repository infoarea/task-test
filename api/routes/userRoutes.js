import express from "express";
import {
  getAllUser,
  createUser,
  getSingleUser,
  deleteUser,
  updateUser,
  updateUserStatus,
  updateUserPassword,
  updateProfilePicture,
} from "../controllers/userController.js";
import tokenVerify from "../middlewares/tokenVerify.js";
import { brandLogo } from "../utils/multer.js";

const router = express.Router();

router.use(tokenVerify);

// routing
router.route("/").get(getAllUser).post(createUser);
router
  .route("/:id")
  .get(getSingleUser)
  .delete(deleteUser)
  .put(updateUser)
  .patch(updateUserPassword)
  .put(brandLogo, updateProfilePicture);

router.route("/profile/:id").put(brandLogo, updateProfilePicture);
router.route("/user-status/:id").patch(updateUserStatus);

// export
export default router;
