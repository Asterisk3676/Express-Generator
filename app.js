var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

const validate = require('./middleware/validate');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var students = require('./routes/students');
var course = require('./routes/course');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// Students
app.get('/students', students.getAll);
app.get('/students/addForm', students.addForm);
app.post('/students/create',
  validate.required('students[st_id]'),
  validate.unique('students[st_id]'),
  validate.length('students[st_id]', 10),
  validate.required('students[name]'),
  validate.nameFormat('students[name]'),
  students.create
);
app.get('/students/edit/:id', students.editForm);
app.post('/students/update',
  validate.required('students[st_id]'),
  validate.length('students[st_id]', 10),
  validate.required('students[name]'),
  validate.nameFormat('students[name]'),
  students.update
);
app.get('/students/delete/:id', students.delete);

// Course
app.get('/course', course.getAll);
app.get('/course/addForm', course.addForm);
app.post('/course/create',
  validate.required('course[c_id]'),
  validate.unique('course[c_id]'),
  validate.courseFormat('course[c_id]'),
  validate.required('course[name]'),
  validate.required('course[creditPoint]'),
  validate.creditLength('course[creditPoint]'),
  course.create
);
app.get('/course/edit/:id', course.editForm);
app.post('/course/update',
  validate.required('course[c_id]'),
  validate.courseFormat('course[c_id]'),
  validate.required('course[name]'),
  validate.required('course[creditPoint]'),
  validate.creditLength('course[creditPoint]'),
  course.update
);
app.get('/course/delete/:id', course.delete);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
