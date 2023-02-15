const { Todo } = require("$models");

const create = async (req, res) => {
  console.log(req.ctx);
  try {
    const todo = await Todo.create({ ...req.body, userId: req.ctx.user.id });
    return res.status(201).json({
      todo,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({
      where: { id: id, userId: req.ctx.user.id },
    });
    if (todo) {
      return res.status(200).json({ todo });
    }
    return res.status(404).json({
      message: "Todo doesn't exist",
      key: "todo.not.found",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const findAll = async (req, res) => {
  try {
    // #TODO: implement pagination

    let where = {
      userId: req.ctx.user.id,
    };
    if (req.query.status == "completed") {
      where.completed = true;
    }
    if (req.query.status == "incomplete") {
      where.completed = false;
    }

    const todos = await Todo.findAll({
      order: [["id", "DESC"]],
      where,
    });
    return res.status(200).json({ todos });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Todo.update(req.body, {
      where: { id: id, userId: req.ctx.user.id },
    });
    if (updated) {
      const updatedTodo = await Todo.findOne({ where: { id: id } });
      return res.status(200).json({ todo: updatedTodo });
    }
    return res.status(404).json({
      message: "Todo doesn't exist",
      key: "todo.not.found",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteFn = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.destroy({
      where: { id: id, userId: req.ctx.user.id },
    });
    if (deleted) {
      return res.status(200).json({
        message: "Todo has been deleted",
        key: "todo.deleted",
      });
    }
    return res.status(404).json({
      message: "Todo doesn't exist",
      key: "todo.not.found",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  create,
  findOne,
  findAll,
  update,
  deleteFn,
};
