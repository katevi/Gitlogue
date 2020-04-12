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
    let stompClient = Stomp.over(socket);
    return stompClient; 
} 

  constructor() { }
}
