$(document).ready(function() {

	//Fired when client enters a username
	// username is validated and then accepted as valid
	$('#input_username').focusout(function(){

    	username = $('#input_username').val();
    	socket.emit('uname', username);
    	$('#btn_close_modal').click();
	});

	//Fired when Enter is hit after typing the message OR
	// client clicks the Send Message button to send the
	// chat message
	$('#send-message').on('click', function(){
		var value = $('#message-box').val();
		if(value.length > 0){
			socket.emit('chat', value);
			$('#message_area').append($("<p class='text-muted text-right'>").text(username+': '+value));
		}
		$('#message-box').val('');
	});
});