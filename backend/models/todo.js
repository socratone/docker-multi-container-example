const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  text: String,
});

const Todo = model('Todo', todoSchema);

module.exports = Todo;
