import express from "express";
import {
  userLogin,
  refreshToken,
  userLogout,
  userRegister,
  loggedInUser,
} from "../controllers/authController.js";
import tokenVerify from "../middlewares/tokenVerify.js";

const router = express.Router();

// routing
router.route("/login").post(userLogin);
router.route("/refresh").get(refreshToken);
router.route("/logout").post(userLogout);
router.route("/register").post(userRegister);

router.get("/me", tokenVerify, loggedInUser);

// export
export default router;
