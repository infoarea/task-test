import express from "express";

import tokenVerify from "../middlewares/tokenVerify.js";
import {
  createTask,
  deleteTask,
  getAllTask,
  getSingleTask,
  updateTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

router.use(tokenVerify);

// routing
router.route("/").get(getAllTask).post(createTask);
router
  .route("/:id")
  .get(getSingleTask)
  .delete(deleteTask)
  .put(updateTask)
  .patch(updateTask);
router.route("/task-status/:id").patch(updateTaskStatus);
router.route("/task-status/:id").put(updateTaskStatus);

// export
export default router;
