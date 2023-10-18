import Task from "../models/Task.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { createSlug } from "../helper/createSlug.js";

import { cloudPublicId } from "../helper/helpers.js";

/**
 * @desc get all tasks data
 * @route GET /task
 * @access PUBLIC
 */
export const getAllTask = asyncHandler(async (req, res) => {
  const task = await Task.find().populate("category").populate("tag");

  if (task.length > 0) {
    res.json({ task });
  }
  res.json({ message: "Tasks not found" });
});

/**
 * @desc get Single tasks data
 * @route GET /tasks/:id
 * @access PUBLIC
 */
export const getSingleTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    return res.status(400).json({ message: "Single task not found" });
  }

  res.json(task);
});

/**
 * @desc create new Task
 * @route POST /task
 * @access PUBLIC
 */
export const createTask = asyncHandler(async (req, res) => {
  // get data
  const { name, description, category, tag } = req.body;

  // check validation
  if (!name) {
    return res.status(400).json({ message: "Name field is required" });
  }

  // Task Check
  const taskCheck = await Task.findOne({ name });

  if (taskCheck) {
    return res.status(400).json({ message: "Task already exists" });
  }

  // // create new Task data
  const task = await Task.create({
    name,
    slug: createSlug(name),
    description,
    category: category,
    tag: tag,
  });

  // check
  if (task) {
    return res.status(201).json({ message: "Task created successful", task });
  } else {
    return res.status(400).json({ message: "Invalid task data" });
  }
});

/**
 * @desc delete Task data
 * @route DELETE /:id
 * @access PUBLIC
 */
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    return res.status(400).json({ message: "Task delete failed" });
  }

  res.status(200).json({ task, message: "Task delete successful" });
});

/**
 * @desc update task data
 * @route PATCH /:id
 * @access PUBLIC
 */
export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, description, category, tag } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Task name is required" });
  }

  const task = await Task.findByIdAndUpdate(
    id,
    { name, slug: createSlug(name), description, category, tag },
    { new: true }
  );

  res.status(200).json({
    message: `Task updated successfull`,
    task: task,
  });
});

/**
 * @desc update task status
 * @route PATCH /task/:id
 * @access PUBLIC
 */
export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const task = await Task.findByIdAndUpdate(id, { status }, { new: true });

  res.status(200).json({
    message: `Task status updated`,
    task: task,
  });
});
