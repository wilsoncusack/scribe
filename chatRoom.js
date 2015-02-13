
$(document).ready(function(){
	
	var socket = io.connect();

	$("#messageField").keypress(function (e) {
		if(e.keyCode == 13) {
			send(e);
		}
	});
	
	// probably won't need these
	var sentMessages = {};
	var id = 0;

    /*socket.emit('join', function(messages){
	//some waiting for both people to be ready
    });*/

	function send(e) {
		e.preventDefault(); 
		socket.emit('sendMessage', {message: $('#messageField').val(), id: id});
		sentMessages[id] = "sent";
		id++;
		$('#messageField').val("");
	}

    socket.on('getMessage', function(message){
		var post = $("#messages");
		post.prepend('<li id=' + id +'> </li>')
		$("#" + id).text(message.message);
		// if(!(sentMessages.hasOwnProperty(message.id))){
			var msg = new SpeechSynthesisUtterance(message.message);
    		window.speechSynthesis.speak(msg);
			// var text = encodeURIComponent(message.message);
			// var url = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + text + "&tl=en";
			// console.log(url);
			// $('audio').attr('src', url).get(0).play();
		// }
	});


});