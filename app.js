var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('express-flash');

var indexRouter = require('./routes/index');
var members = require('./routes/members');
var admin = require('./routes/admin');
var staff = require('./routes/staff');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set up mongoose connection
mongoose.connect('mongodb://127.0.0.1/studydb'); // studydb is anyname can insert
var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:'));

//session : before routing
    app.use(session({
          secret: 'XailEJS#@S12S',// any string for security
          resave: false,
          saveUninitialized : true
}));

app.use(flash()); // after cookie, session

//set session
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});
app.use('/', indexRouter);
// app.use(function(req, res, next){
//   if(req.session.user){
//     next();
//   }else {
//     req.flash('warn','Authorization failed! please login');
//     res.redirect('/signin');// redirect to other page
//   }
// });

app.use('/admin', admin);
app.use('/members', members);
app.use('/staffs', staff);
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
