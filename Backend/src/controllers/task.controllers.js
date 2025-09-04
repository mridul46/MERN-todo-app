import { Task } from "../models/Task.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
//Add Task
const createTask = asyncHandler(async (req, res) => {
  const { title, description, category, priority } = req.body;
  console.log("incoming task body",req.body)
  if (!title) {
    throw new ApiError(409, "Title is required");
  }
  if (!description) {
    throw new ApiError(409, "Description is required");
  }

  const task = await Task.create({
    title,
    description,
    category,
    priority,
    createdAt: new Date(),
    user: req.user?._id, // ✅ store which user created the task
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {task} ,
      "Task created successfully"
    )
  );
});
// view Task
const getTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });

  if (!tasks || tasks.length === 0) {
    throw new ApiError(404, "No tasks found. Create your first task!");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { tasks },
      "Fetched all tasks for the user"
    )
  );
});
//update task
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;   // extract id properly
  const updates = req.body;    // updated fields

  // update only if task belongs to the logged-in user
  const task = await Task.findOneAndUpdate(
    { _id: id, user: req.user._id },
    updates,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new ApiError(404, "Task not found or not authorized");
  }

  return res.status(200).json(
    new ApiResponse(200, { task }, "Task updated successfully")
  );
});

// toggle task
const toggleComplete= asyncHandler(async(req,res)=>{
    const task=await Task.findOne({
        _id:req.params.id,
        user:req.user._id
    });
    if(!task){
        throw new ApiError(404,"Task is not found")
    }
    task.complete=!task.complete
    await task.save();
    return res.status(200)
    .json(
        new ApiResponse(200, 
        {task},
         "update the task whether is complete or not")
    );
})
//delete task
const deleteTask= asyncHandler(async(req,res)=>{
    const task=await Task.findByIdAndDelete(
        {
            _id:req.params.id,
            user:req.user.id
        }
    )
    if(!task){
        throw new ApiError(404,"task is not found")
    }
    return res.status(200).json(
        new ApiResponse(200,
            {},
            "Task is successfully deleted"
        )
    )
})
export {
    createTask,
    getTask,
    updateTask,
    toggleComplete,
    deleteTask
}
