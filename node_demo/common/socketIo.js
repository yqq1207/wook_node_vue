//
//var app = require('../app.js');
////var io = require('socket.io').listen(app);
//var http = require('http');
//var fs = require('fs');
//var server = http.createServer(function (req,res){
//  // fs.readFile('./index.html',function(error,data){//若根目录有index.html，访问地址，将显示index.html
//  //     res.writeHead(200,{'Content-Type':'text/html'});
//  //     res.end(data,'utf-8');
//  // });
//}).listen(9051,"127.0.0.1");//创建http服务
//console.log('Server running at http://127.0.0.1:9051/');
//
//var io = require('socket.io').listen(server);
//io.sockets.on('connection', (socket) => {
//  var timer = '';
//  console.log('链接成功');
//  socket.on('start', () => {//监听前端发送的start
//      timer = setInterval(function () {//定时器每五秒发一次
//          socket.emit('login', {//触发emit,前端接收
//              "Action": "DataRecv",
//              "Data": {
//              "Reporting_mode": {"T":"I","V":5},
//          }
//          });
//      },5000)
//  });
//});
