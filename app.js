//Dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Modules
var index = require('./routes/index');
var login = require('./routes/login');

var app = express();
var port = process.env.ELEPHANTSQL_URL || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', index);
app.use('/login', login);

//Catch 404
app.use(function(req, res, next) {
  var err = new err('Not Found');
  err.status = 404;
  next(err);
});

//err handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.err = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('err');
});

//Exporting module
module.exports = app;
