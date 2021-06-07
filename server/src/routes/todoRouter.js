const todoRouter = require('express').Router();

const {
  getTodos,
  newTodo,
  editTodo,
  deleteTodo,
} = require('../controllers/todoController.js');
const { checkAuth } = require('../middlelwares/checkAuth.js');

todoRouter.route('/')
.get(checkAuth, getTodos)
.post(checkAuth, newTodo)
.patch(checkAuth, editTodo)
.delete(checkAuth, deleteTodo)

module.exports = todoRouter;

