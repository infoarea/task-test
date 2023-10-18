import jwt from "jsonwebtoken";
import User from "../models/User.js";

const tokenVerify = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(400).json({ message: "Unauthorized" });
  }

  try {
    const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const me = await User.findOne({ email: decode.email })
      .select("-password")
      .populate("role");

    if (!me) {
      return res.status(400).json({ message: "User not found" });
    }

    req.me = me;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

export default tokenVerify;
