import { Task } from "../models/Task.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

// ✅ Add Task
const createTask = asyncHandler(async (req, res) => {
  const { title, description, category, priority, due_date } = req.body;

  if (!title) throw new ApiError(400, "Title is required");
  if (!description) throw new ApiError(400, "Description is required");

  const task = await Task.create({
    title,
    description,
    category,
    priority,
    due_date,
    user: req.user._id, // ✅ ensure task is linked to logged-in user
  });

  return res.status(201).json(
    new ApiResponse(201, { task }, "Task created successfully")
  );
});

// ✅ View all tasks of user
const getTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });

  if (!tasks || tasks.length === 0) {
    throw new ApiError(404, "No tasks found. Create your first task!");
  }

  return res.status(200).json(
    new ApiResponse(200, { tasks }, "Fetched all tasks for the user")
  );
});

// ✅ Update task
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: id, user: req.user._id },
    updates,
    { new: true, runValidators: true }
  );

  if (!task) throw new ApiError(404, "Task not found or not authorized");

  return res
    .status(200)
    .json(new ApiResponse(200, { task }, "Task updated successfully"));
});

// ✅ Toggle task completion
const toggleComplete = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) throw new ApiError(404, "Task not found or not authorized");

  task.complete = !task.complete;
  await task.save();

  return res.status(200).json(
    new ApiResponse(200, { task }, "Task completion status updated")
  );
});

// ✅ Delete task (fixed)
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) throw new ApiError(404, "Task not found or not authorized");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task successfully deleted"));
});

export { createTask, getTask, updateTask, toggleComplete, deleteTask };
