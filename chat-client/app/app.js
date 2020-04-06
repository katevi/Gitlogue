var stompClient = null;

var name = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#dialogue").html("");
}

function connect() {
    var socket = new SockJS('http://localhost:8080/chat-websocket/');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/publishedMessages', showMessage);
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
	var messageContent = $("#message").val();
	var chatMessage = {
		sender: name,
		content: messageContent
	}
    stompClient.send("/app/sendedMessages", {}, JSON.stringify(chatMessage));
	$("#message").value = ' ';
}

function showMessage(payload) {
	var message = JSON.parse(payload.body);
    $("#dialogue").append("<tr><td>" + message.sender + ":" + message.content + "</td></tr>");
}

function register() {
	name = $("#name").val();
	stompClient.send("/app/chat.newUser", {}, JSON.stringify({
		sender : name
	}))
}

function connectionSuccess() {
	stompClient.subscribe('/topic/publishedMessages', onMessageReceived);

	stompClient.send("/app/chat.newUser", {}, JSON.stringify({
		sender : name
	}))

}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendMessage(); });
	$("#register").click(function() {register();});
});