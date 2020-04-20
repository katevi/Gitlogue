import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor() { }

  ngOnInit() {}
}