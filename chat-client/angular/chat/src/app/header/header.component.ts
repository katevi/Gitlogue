import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

// todo: remove socket references
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private stompClient: any;
  myWebSocket: WebSocketSubject<any> = webSocket("http://localhost:8080/chat-websocket/");

  constructor(
    public websocketService: WebsocketService
  ) { }

  ngOnInit() {}
}
