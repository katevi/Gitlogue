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
  public registerUser(newUser: User, avatar: Avatar) {
    const options = { headers: { 'Content-Type': 'application/json' } };
    /*return this.http.post(`${this.TARGET_MSG_SERVER}/registration/users/`,
      JSON.stringify(newUser), options).subscribe(response => {

        console.log("Reigstration response: " + JSON.stringify(response))
      });*/
    return this.http.post(`${this.TARGET_MSG_SERVER}/registration/users/`, 
      newUser,
      {observe:'response'}).subscribe( response => {
        console.log(response.body);
      },
      error => console.log(error)
    ) 
    /*return this.http.post(`${this.TARGET_MSG_SERVER}/registration/users/`, 
      newUser, 
      options).subscribe(response => {
      const uploadData = new FormData();
      uploadData.append('avatar', avatar.getFile, avatar.getFilename);

      this.http.post('http://localhost:8080/registration/users/avatar/k', uploadData)
        .subscribe(
               res => {console.log(res);
                       this.receivedImageData = res;
                       this.base64Data = this.receivedImageData.pic;
                       this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
               err => console.log('Error Occured durinng saving: ' + err)
            );
    });*/
  }
}
