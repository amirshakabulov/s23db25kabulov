var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const connectionString = process.env.MONGO_CON;
mongoose = require('mongoose');
mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){console.log("Connection to DB succeeded")});

var Education = require("./models/education");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var educationRouter = require('./routes/education');
var boardRouter = require('./routes/board');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/education', educationRouter);
app.use('/board', boardRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

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
//We can seed the collection if needed on server start
async function recreateDB(){
	// Delete everything
	await Education.deleteMany();
	let instance1 = new Education({Level: "High School", Type: "GED", Cost: 100,})
	let instance2 = new Education({Level: "University", Type: "Bachelor's", Cost: 60000,})
	let instance3 = new Education({Level: "Grad School", Type: "PHD", Cost: 100000,})
	try {
	  await instance1.save();
	  console.log("First object saved");
	  await instance2.save();
	  console.log("Second object saved");
	  await instance3.save();
	  console.log("Third object saved");
	} catch (err) {
	  console.error(err);
	}
  }
  
let reseed = true;
if (reseed) { recreateDB();}

module.exports = app;
