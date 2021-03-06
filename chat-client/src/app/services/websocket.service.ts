import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client'

import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Avatar } from '../models/avatar.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private TARGET_MSG_SERVER = 'http://192.168.99.100:8080';
  private MSG_SERVER_SOCKET_URL = `${this.TARGET_MSG_SERVER}/chat-websocket/connect`;

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
    console.log("Connecting...");
    _this.stompClient.connect({}, function (frame) {
      console.log("connected");
      _this.stompClient.subscribe("/topic/publishedMessages", function (message) {
        _this.onGeneralMessageReceived(message);
      });
    }, error => {
      console.log(error);
    });

  }

  /**
   * Triggers each time a new message is received.
   */
  private onGeneralMessageReceived(message) {
    let msgBody: any = JSON.parse(message.body);
  
    let newMsg = new Message(msgBody.sender, msgBody.content);
    this.lastReceivedMsg$.next(newMsg);
  }

  /**
   * Made special function for private message to underline that in future it is private 
   * @param message 
   */
  private onPrivateMessageReceived(message) {
    console.log(message.body);
    let msgBody: any = JSON.parse(message.body);
    let newMsg = new Message(msgBody.sender, msgBody.content, msgBody.receiver);
    this.lastReceivedMsg$.next(newMsg);
  }

  /**
   * Sends new message via STOMP.
   * @param msg object represents message. Make sure ...
   * ... to have it sync up with REST API model.
   */
  public sendMsg(msg: Message) {
    if (msg.getReceiver() == null) {
      this.stompClient.send("/sentMessages", {}, JSON.stringify(msg));
      return;
    }
    this.stompClient.send(`/chat.private.${msg.getReceiver()}`, {}, JSON.stringify(msg));
    this.lastReceivedMsg$.next(msg);
  }

  /**
   * Return subscription for last message received ...
   * ... via web socket.
   */
  public getLastReceivedMsg(): Observable<Message> {
    return this.lastReceivedMsg$.asObservable();
  }


  private checkResponseForServer(response: HttpResponse<Object>, user : User): boolean {
    let userParams: string[] = JSON.parse(JSON.stringify(response.body));
    
    return (userParams["userName"] == user.getUsername() &&
      userParams["fullName"] == user.getFullName() &&
      userParams["password"] == user.getPassword() &&
      userParams["githubAccUrl"] == user.getGithubAccUrl()
    );
  }

  public setAvatar(userName: string, avatar: Avatar = null) {
    const options = { headers: { 'Content-Type': 'application/json' } };
    
    // Entered registration data is correct - client sends avatar to server
    // Forming multipart data to send file
    const uploadData = new FormData();
    uploadData.append('avatar', avatar.getFile(), avatar.getFilename());

    return this.http.post(
      `${this.TARGET_MSG_SERVER}/users/user/avatar?nickname=${userName}`, uploadData)
      .subscribe(
               res => {console.log('Avatar set successfully. ');},
               err => console.log('Error Occured during saving: ' + err)
              );
  }

  /**
   * Sends POST request for user registration.
   * @param newUser user instance.
   * @param avatar user avatar
   */
  public registerUser(newUser: User, avatar: Avatar = null) {
    const options = { headers: { 'Content-Type': 'application/json' } };
    // Firstly sends to the server user metadata without avatar to check if such user 
    // does not exist yet
    return this.http.post(`${this.TARGET_MSG_SERVER}/registration/`, 
      newUser,
      {observe:'response'}).subscribe( response => {
        console.log("Registration response: " + JSON.stringify(response))
      
        const _this = this;
        _this.stompClient.subscribe(`/user/${newUser.getUsername()}/`, function(message) {
          _this.onPrivateMessageReceived(message);
        });
      
        if (avatar == null) {
          console.log("Default avatar will be set.");
          return;
        }
        
        this.setAvatar(newUser.getUsername(), avatar);
      },
      error => console.log('Error occured during user registration: ' + error)
    ) 
  }
}
