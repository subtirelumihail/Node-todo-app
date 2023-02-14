const { Router } = require("express");

const router = Router();

const TodoController = require("$controllers/todo");

router.post("/", TodoController.create);
router.get("/", TodoController.findAll);
router.get("/:id", TodoController.findOne);
router.put("/:id", TodoController.update);
router.delete("/:id", TodoController.deleteFn);

module.exports = router;
