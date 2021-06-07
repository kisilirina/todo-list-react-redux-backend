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
// app.use(cors())
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
// const root = require('path').join(__dirname, '../', 'client', 'build');
// app.use(express.static(root));
// app.get('*', (req, res) => {
//   res.sendFile('index.html', { root });
// });

app.listen(
  PORT,
  () => {
    console.log(`Server started on port ${PORT}.`);
    connect(process.env.DB_URL, {
      useNewUrlParser: true, // говорим mongoose, что строка подключения будет в новом формате (новый формат должен обязательно содеражт порт)
      useFindAndModify: false, // заставляем методы findOneAndUpdate() и findOneAndRemove() использовать нативный (т.е предоставленный самой mongodb) метод findOneAndUpdate() вместо findAndModify()
      useCreateIndex: true, // Заставляем mongoose работать с функцией createIndex() драйвера mongodb вместо ensureIndex(). Так как последний помечен драйвером mongodb, как устаревший
      useUnifiedTopology: true, // заставляем mongoose использование новый механизм управления подключением драйвера mongodb.
      poolSize: 10, // максимальное количество сокетов, которые драйвер MongoDB будет держать открытыми для этого соединения
      bufferMaxEntries: 0, // говорим mongoose перестать выполнять любые операции с базой данных, после того как произодет отключение от последней.
      // В противном случае mongoose пытается дождаться восстановления соездинения, для завершения  операций
    }, () => console.log('Connection to db!'));
  },
)

