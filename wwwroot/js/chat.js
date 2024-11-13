var chatConnection = new signalR.HubConnectionBuilder().withUrl("/hubs/chat").build();

chatConnection.on("NewMessage", function (user, message) {
	var li = document.createElement('li');
	li.textContent = `${user}: ${message}`;
	document.getElementById('messagesList').appendChild(li);
});

document.getElementById('sendMessage').addEventListener('click', function (event) {
	var sender = document.getElementById('senderEmail').value;
	var receiver = document.getElementById('receiverEmail').value;
	var message = document.getElementById('chatMessage').value;

	if (message.length > 0) {
		receiver ? chatConnection.send("SendMessageToUser", sender, receiver, message)
			: chatConnection.send("SendMessageToAll", sender, message);
		document.getElementById('chatMessage').value = '';
	}

	event.preventDefault();
});

chatConnection.start().then(function () {
	document.getElementById('sendMessage').disabled = false;
});