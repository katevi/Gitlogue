const express = require('express')
const app = express()
const port = 8081

const stompjs = require('stompjs');
const sockjs = require('sockjs-client');

var stompClient = null;

app.post('/connection', (request, response) => {
	response.sendFile(__dirname + `/index.html`);
	connect();
	response.redirect('/');
});

app.post('/sendedMessages', (request, response) => {
	console.log('Sended');
});

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
    var stompClient = new StompJs.Client('http://localhost:8080/chat-websocket/');
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/publishedMessages', function (dialogue) {
            showMessage(JSON.parse(dialogue.body).content);
        });
    });
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + `/index.html`);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})