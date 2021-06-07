const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    min: 5,
  },
  password: {
    type: String,
    required: true,
    min:8,
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'todos',
  }],
});

module.exports = model('users', userSchema);