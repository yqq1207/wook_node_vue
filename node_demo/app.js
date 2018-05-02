var createError = require('http-errors');
var http = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysqlCreate = require('./common/mysqlCreate.js');


//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var router = require('./routes/router.js')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', router);
//app.use('/postChange', router);
//解决跨域
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    if (req.method == "OPTIONS") {
        res.send(200);
        /*让options请求快速返回*/
    } else {
        next();
    } 
});

router(app);

var hostName = '127.0.0.1';
var port = 9051;
var server = http.createServer(app).listen(port,hostName,function(){

   console.log(`服务器运行在http://${hostName}:${port}`);

});
//或者下边这种
//app.listen(port,hostName,function(){
//
// console.log(`服务器运行在http://${hostName}:${port}`);
//
//});

/**
 *即时通讯 
 */
var socketio = require('socket.io');
console.log()
var io = socketio(server);
io.sockets.on('connection',function(socket){
    console.log('User connected');
    socket.on('message',function(ms){
        console.log('User disconnected');
        console.log(ms);
        socket.broadcast.emit('message', data);
    });
});
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
