const Todo = require("../db/todo.model.js");
const User = require('../db/user.model.js');

const getTodos = async (req, res) => {
  setTimeout(async () => {

    const todos = (await User.findById(req.session.user.id).populate('tasks')).tasks;
  
    return res.json(todos);
  }, 3e3)
}

const newTodo = async (req, res) => {
  const newTodo = await Todo.create({ task: req.body.task });
  await User.findByIdAndUpdate(req.session.user.id, { $push: { tasks: newTodo._id } })
  return res.json(newTodo);
}

const editTodo = async (req, res) => {
  try {
    const { id, task, done, edit } = req.body
    if (task) {
      await Todo.findByIdAndUpdate(id, { task, edit });
      return res.status(200).json(await Todo.findById(id));
    }
    if (done !== undefined) await Todo.findByIdAndUpdate(id, { done });
    if (edit) await Todo.findByIdAndUpdate(id, { edit });

    return res.sendStatus(200);
  } catch (error) {
    console.log("error patch", error.message);
    res.sendStatus(400);
  }

}

const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.body.id);
    await User.findByIdAndUpdate(req.session.user.id, { $pull: { tasks: req.body.id } })
    return res.sendStatus(200);
  } catch {
    console.log("error delete", error.message);
    res.sendStatus(400);
  }
}

module.exports = {
  getTodos,
  newTodo,
  editTodo,
  deleteTodo,
}

