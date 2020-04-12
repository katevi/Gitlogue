import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs'; 
import * as SockJS from 'sockjs-client'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private serverUrl = 'http://localhost:8080/chat-websocket';
  
  private stompClient;

  public connect() { 
    let socket = new SockJS(this.serverUrl);
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
} 