const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const { default: mongoose } = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/finalProject')
  .then(connectObject => {
    console.log(`connected to db ${connectObject.connections[0].name}`);
  })
  .catch(err => console.log(err));

  app.use(
    session({
      secret: 'oof',
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 600000 // 600 * 1000 ms === 10 min
      },
      store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/finalProject',
    })}
    ))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({origin: ['http://localhost:3000']}))


const auth = require('./routes/auth.routes')
const createcourse = require('./routes/createCourse.routes')

app.use('/', createcourse)

app.use('/', auth)

module.exports = app;
