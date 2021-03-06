var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var cors=require('cors');
var app = express();
var mongoose=require('mongoose');
var passport=require('passport');
var flash=require('connect-flash');
var session=require('express-session');

var configDB=require('./config/database.js')
mongoose.connect(configDB.url);



var authentication=require('./dataservice/userauthentication');
authentication(passport);







// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(cors());
app.use(session({secret:'meanoverflow'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./routes/index')(app,passport);





//app.use('/api', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    //console.log('prathu');
   // console.log(req);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {

    res.status(err.status || 500).send({message:err.message + ' '+err.status});
});



module.exports = app;
