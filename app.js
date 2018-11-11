var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index.route');
var usersRouter = require('./routes/users.route');
var taskRouter = require('./routes/task.route');
var authRouter = require('./routes/auth.route');
var verifyToken = require('./config/auth.helper').verifyToken;
var sequelize = require('./models');
sequelize
  .authenticate()
  .then(() => {
    console.log('-----------Connection has been established successfully-----------------');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
//CORS
var cors = require('cors');

// db connection 
var mongoose = require('mongoose');

mongoose.connect('mongodb://sprint-schedule:sprint1234@ds163842.mlab.com:63842/sprint-schedule',
  { useNewUrlParser: true })
  .then((resp) => {
    console.log('connect successfully')
  }).catch((error) => {
    console.log('error occuer', error);
  })
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Allow cros
app.use(cors());

app.use('/', indexRouter);
app.use('/auth', authRouter);
// app.use('/users', usersRouter);
// app.use('/task', verifyToken, taskRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
