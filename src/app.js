var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// middleware

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, 'uploads')));
app.use(cors());

// routes
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/v1/products', productsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.status(404).json({ error: 'Ruta no encontrada' });

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // the error status
  res.status(err.status || 500).json({ error: 'Error interno del servidor' });
  // res.render('error');
});

module.exports = app;
