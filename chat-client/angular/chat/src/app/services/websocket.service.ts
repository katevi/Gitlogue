import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client'

import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private TARGET_MSG_SERVER = 'http://localhost:8080';
  private MSG_SERVER_SOCKET_URL = `${this.TARGET_MSG_SERVER}/chat-websocket`;

  private stompClient: any;
  private messabePublishing$: Subscription = new Subscription();
  private lastReceivedMsg$: BehaviorSubject<Message> = new BehaviorSubject<Message>(null);

  constructor(private http: HttpClient) {}
  
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
    let msgBody: any = JSON.parse(message.body);
    let newMsg = new Message(msgBody.sender, msgBody.content);
    this.lastReceivedMsg$.next(newMsg);
  }


  sendMsg(msg: string, senderName: string) {
    let info: Object = {
      content: msg,
      sender: senderName
    }
    this.stompClient.send("/app/sendedMessages", {}, JSON.stringify(info));
  }

  public getLastReceivedMsg(): Observable<Message> {
    return this.lastReceivedMsg$.asObservable();
  }

  public geStompClient() {
    return this.stompClient;
  }

  public getMsgSubscription() {
    return this.stompClient.subscribe("/topic/publishedMessages");
  }

  public registerUser(newUser: User) {
    let newUserFormData = new FormData();
    let userParam = new Blob([JSON.stringify(newUser)], { type: "application/json" });
    newUserFormData.append('user', userParam);
    return this.http.post(`${this.TARGET_MSG_SERVER}/registration/user/`, newUserFormData)
  }
} 