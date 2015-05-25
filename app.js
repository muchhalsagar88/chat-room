var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

/*
* Generator functions for messages to be passed
*/
var prompt_uname_msg = function(){
    return {msg: "Please enter a user name"};
};

var user_left_msg = function(uname) {
    return uname+" left the chat room";
};

//global chat counter
var chat_counter = 0;


/*
* Creating the HTTP server for listening to tweets
*/
var server = require('http').createServer(app);
var port = 3000;
server.listen(port);
console.log("Socket.io server listening at http://127.0.0.1:" + port);

var sio = require('socket.io').listen(server);

//Socket.io callback for connection of client
sio.on('connection', function(socket){
    var username;
    console.log('New user connected.');

    //send a prompt to client to enter username
    socket.emit('prompt_name', prompt_uname_msg());

    //handler for username returned by client
    socket.on('uname', function(name){
        username = name;
        console.log('Username: '+username+' sent to server.');
    });

    //handler for chat message sent by client
    socket.on('chat', function (msg) {
        console.log('recieved msg '+msg+' from user '+username);

        socket.broadcast.emit('chat', username+': '+msg);
    });

    //handler when client disconnects
    socket.on('disconnect', function(){
        console.log('Username: '+username+' disconnected.');
        socket.broadcast.emit('user_left', user_left_msg(username));
    });
});
