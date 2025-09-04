import {Router} from "express"
import { createTask, getTask,updateTask,toggleComplete, deleteTask} from "../controllers/task.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const router=Router();


router.route("/add-task").post(verifyJWT,createTask);
router.route("/get-task").get(verifyJWT,getTask);
router.route("/:id").put(verifyJWT,updateTask)
router.route("/:id/complete").patch(verifyJWT, toggleComplete)
router.route("/:id").delete(verifyJWT,deleteTask)
export default router;

