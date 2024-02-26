const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

const Todo = require('./models/todo');

app.use(cors());
app.use(bodyParser.json());

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

app.post('/api/todos', async (req, res) => {
  const text = req.body?.text;

  try {
    if (!text) {
      throw new Error('Text required.');
    }
    if (text.length > 100) {
      throw new Error('Text too long.');
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  const todo = new Todo({
    text,
  });

  try {
    await todo.save();
    res.status(201).send({ _id: todo._id });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  const id = req.params?.id;

  try {
    if (!id) {
      throw new Error('ID required.');
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).send({ _id: id });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

const main = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/todos');

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
