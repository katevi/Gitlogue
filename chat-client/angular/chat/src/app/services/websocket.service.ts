import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs'; 
import * as SockJS from 'sockjs-client'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private TARGET_MSG_SERVER = 'http://localhost:8080';
  private MSG_SERVER_SOCKET_URL = `${this.TARGET_MSG_SERVER}/chat-websocket`;
  
  private stompClient;

  public getMsgPublishSubscription() { 
    return this.stompClient;
  }
  public establishConnection() { 
    let socket = new SockJS(this.MSG_SERVER_SOCKET_URL);
    this.stompClient = Stomp.over(socket);


    var connectCallback = function() {
      console.log("connected");
    };
    this.stompClient.connect({}, connectCallback);
    var receiveMsgCallback = function(message) {
      console.log(JSON.parse(message.body).content);
    }

    var newMsgSubscription = this.stompClient.subscribe('/topic/publishedMessages', receiveMsgCallback);
  }

  public sendMsg(msg: String) {
    this.stompClient.send("/app/sendedMessages", {}, JSON.stringify({'name': msg}));
  }
} 