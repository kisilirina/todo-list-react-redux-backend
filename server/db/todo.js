const { Schema, model, pluralize } = require('mongoose');

pluralize(null);


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