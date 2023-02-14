const { Router } = require("express");

const router = Router();

const todo = require("./todo");

router.use("/todos", todo);

router.get("/", (_req, res) => res.send("This is root!"));

module.exports = router;
