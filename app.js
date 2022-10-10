const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const { default: mongoose } = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/finalProject')
  .then(connectObject => {
    console.log(`connected to db ${connectObject.connections[0].name}`);
  })
  .catch(err => console.log(err));

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
