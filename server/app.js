require('dotenv').config();
const express = require('express')
const cors = require('cors')
const Todo = require('./db/todo')
const {connect} = require('mongoose')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/api/v1/todos', async (req, res) => {
  setTimeout(async () => {

    const todos = await Todo.find();
  
    return res.json(todos);
  }, 3e3)
})

app.post('/api/v1/todos', async (req, res) => {
  const newTodo = await Todo.create({ task: req.body.task });
  return res.json(newTodo);
})

app.patch('/api/v1/todos', async (req, res) => {
  try {
    const { id, task, done, edit } = req.body
    if (task) {
      await Todo.findByIdAndUpdate(id, { task, edit });
      return res.status(200).json(await Todo.findById(id));
    }
    if (done) await Todo.findByIdAndUpdate(id, { done });
    if (edit) await Todo.findByIdAndUpdate(id, { edit });

    return res.sendStatus(200);
  } catch (error) {
    console.log("error patch", error.message);
    res.sendStatus(400);
  }

})

app.delete('/api/v1/todos', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.body.id);
    return res.sendStatus(200);
  } catch {
    console.log("error delete", error.message);
    res.sendStatus(400);
  }
})

app.listen(
  process.env.PORT ?? 3000,
  () => {
    console.log("Start!");
    connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }, () => console.log('Connection to db!'));
  },
)