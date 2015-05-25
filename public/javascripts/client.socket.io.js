var server_name = "http://127.0.0.1:3000/";
var socket = io.connect(server_name);
var username;
console.log('Client: Connecting to server '+server_name);

//Handler fired to prompt client to enter username
socket.on('prompt_name', function(data) {
	$('#btn_auto_uname_prompt').click();
});

//Handler fired when a 'chat' message arrives
socket.on('chat', function(msg) {
	$('#message_area').append($("<p class='text-info'>").text(msg));
});

//Handler fired when a message indicating 'user has left' arrives
socket.on('user_left', function(msg) {
	$('#message_area').append($("<p class='text-warning'>").text(msg));
});