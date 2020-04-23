import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client'

import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Avatar } from '../models/avatar.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private TARGET_MSG_SERVER = 'http://localhost:8080';
  private MSG_SERVER_SOCKET_URL = `${this.TARGET_MSG_SERVER}/chat-websocket`;

  private stompClient: any;
  private lastReceivedMsg$: BehaviorSubject<Message> = new BehaviorSubject<Message>(null);

  constructor(private http: HttpClient) { }

  /**
   * Connects onto web socket.
   */
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

  /**
   * Triggers each time a new message is received.
   */
  private onMessageReceived(message) {
    let msgBody: any = JSON.parse(message.body);
    let newMsg = new Message(msgBody.sender, msgBody.content);
    this.lastReceivedMsg$.next(newMsg);
  }


  /**
   * Sends new message via STOMP.
   * @param msg object represents message. Make sure ...
   * ... to have it sync up with REST API model.
   */
  public sendMsg(msg: Message) {
    this.stompClient.send("/app/sendedMessages", {}, JSON.stringify(msg));
  }

  /**
   * Return subscription for last message received ...
   * ... via web socket.
   */
  public getLastReceivedMsg(): Observable<Message> {
    return this.lastReceivedMsg$.asObservable();
  }

  /**
   * Sends POST request for user registration.
   * @param newUser user instance.
   */
  public registerUser(newUser: User, avatar: any) {
    const options = { headers: { 'Content-Type': 'application/json' } };
    return this.http.post(`${this.TARGET_MSG_SERVER}/registration/users/`, 
      newUser,
      {observe:'response'}).subscribe( response => {
        console.log('haha' + response.body);

        const uploadData = new FormData();
      
        uploadData.append('avatar', avatar, avatar.name);
        const nickname = newUser.getUsername();
        console.log('user nickname = ' + nickname);
        return this.http.post(`http://localhost:8080/registration/users/avatar/${nickname}`, 
        uploadData).subscribe(
               res => {console.log(res);},
               err => console.log('Error Occured during saving: ' + err)
            );
      },
      error => console.log(error)  
    ) 
  }
}
