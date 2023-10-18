import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoDBConnect from "./config/db.js";
import corsOptions from "./config/corsSetup.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRoute from "./routes/userRoutes.js";
import permissionRoute from "./routes/permissionRoutes.js";
import roleRoute from "./routes/roleRutes.js";
import brandRoute from "./routes/brandRutes.js";
import taskRoute from "./routes/taskRoutes.js";
import tagRoute from "./routes/tagRutes.js";
import categoryRoute from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoutes.js";
import authRoute from "./routes/authRoutes.js";

// initialization
const app = express();
dotenv.config();
// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// environment vars
const PORT = process.env.PORT || 5050;

//Set static
app.use(express.static("public"));

// routing
app.use("/api/v1/user", userRoute);
app.use("/api/v1/permission", permissionRoute);
app.use("/api/v1/role", roleRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/task", taskRoute);
app.use("/api/v1/tag", tagRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/auth", authRoute);

// error handler
app.use(errorHandler);

// app listen
app.listen(PORT, () => {
  mongoDBConnect();
  console.log(`server is running on port ${PORT}`.bgBlue.black);
});
