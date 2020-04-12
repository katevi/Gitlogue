var stompClient = null;
const serverAddress = 'http://localhost:8080/chat-websocket/';
var stompStatus = false

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
		$("#errorWindow").hide();
    }
    else {
        $("#conversation").hide();
		$("#errorWindow").show();
    }
    $("#dialogue").html("");
}

var stompFailureCallback = function (error) {
    stompStatus = false;
	var message = 'Server is unavailable. Connection failed.';
	$("#errors").append("<tr><td>" + message + "</td></tr>");
	$("#errors").show();
    console.error('Server is unavailable. Connection failed.');
};

function connect() {
    var socket = new SockJS(serverAddress);
    stompClient = Stomp.over(socket);
	stompClient.connect({}, function (frame) {
		setConnected(true);
		stompStatus = true;
		console.log('Connected: ' + frame);
		stompClient.subscribe('/topic/publishedMessages', function (dialogue) {
			showMessage(JSON.parse(dialogue.body).content);
        });
    }, stompFailureCallback);
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    stompClient.send("/app/sendedMessages", {}, JSON.stringify({'name': $("#name").val()}));
}

function showMessage(message) {
    $("#dialogue").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendMessage(); });
});
