const express = require("express");
const router = express.Router();

const taskApiController = require("../controllers/taskApiController");
const subTaskApiController = require("../controllers/subTaskApiController");

router.get("/tasks", taskApiController.getTasks);
router.post("/tasks", taskApiController.createTask);
router.put("/tasks/:id", taskApiController.updateTask);
router.delete("/tasks/:id", taskApiController.deleteTask);

router.get("/tasks/:taskId/subtasks", subTaskApiController.getSubTasks);
router.post("/tasks/:taskId/subtasks", subTaskApiController.createSubTask);
router.put("/tasks/:taskId/subtasks/:subtaskId", subTaskApiController.updateSubTask);
router.delete("/tasks/:taskId/subtasks/:subtaskId", subTaskApiController.deleteSubTask);

module.exports = router;