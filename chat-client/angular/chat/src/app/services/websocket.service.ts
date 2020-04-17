import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client'
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private TARGET_MSG_SERVER = 'http://localhost:8080';
  private MSG_SERVER_SOCKET_URL = `${this.TARGET_MSG_SERVER}/chat-websocket`;

  private stompClient: any;
  private messabePublishing$: Subscription = new Subscription();

  public connect() { 
    let ws = new SockJS(this.MSG_SERVER_SOCKET_URL);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
        _this.stompClient.subscribe("/topic/publishedMessages", function (message) {
            _this.onMessageReceived(message);
        });
    });

  }

  onMessageReceived(message) {
      console.log("Message Recieved from Server :: " + JSON.parse(message.body).content);
  }
} 