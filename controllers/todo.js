const { Todo } = require("$models");

const create = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
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
      where: { id: id },
    });
    if (todo) {
      return res.status(200).json({ todo });
    }
    return res.status(404).send("Todo with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const findAll = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    return res.status(200).json({ todos });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Todo.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedTodo = await Todo.findOne({ where: { id: id } });
      return res.status(200).json({ todo: updatedTodo });
    }
    throw new Error("Todo not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteFn = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).send("Todo deleted");
    }
    throw new Error("Todo not found");
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
