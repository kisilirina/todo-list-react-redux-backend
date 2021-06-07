const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  task: {
    type: String,
  },
  done: {
    type: Boolean,
    default: false,
  },
  edit: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('todos', todoSchema);