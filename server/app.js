require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const sessions = require('express-session');
const cors = require('cors')
const Todo = require('./src/db/todo.model')
const { connect } = require('mongoose')
const MongoStore = require('connect-mongo');
const app = express()

app.set('cookieName', 'sid');

const todoRouter = require('./src/routes/todoRouter.js');
const userRouter = require('./src/routes/userRouter.js');

app.use(cors({
  origin: `${process.env.OUR_URL}`,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(sessions({
  name: app.get('cookieName'),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
  }),
  cookie: {
    httpOnly: true,
    maxAge: 86400 * 1e3,
  },
}));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/todos', todoRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(
  PORT,
  () => {
    console.log(`Server started on port ${PORT}.`);
    connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
      poolSize: 10,
      bufferMaxEntries: 0,
    }, () => console.log('Connection to db!'));
  },
)

