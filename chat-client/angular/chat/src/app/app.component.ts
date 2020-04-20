import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { Message } from './models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Chat';

  public currentMsg: String = "";
  public messages: Message[] = [];
  public hasAuthed: boolean = false;
  // -- User Login info
  public inputFullName: String = "";
  public inputUsername: String = "";
  public inputPassword: String = "";
  public inputGitHubAccount: String = "";

  constructor(
    public websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.websocketService.connect();
    this.websocketService.getLastReceivedMsg().subscribe(
      (newMsg: Message) => {
        if (newMsg == null) {
          return;
        }
        this.messages.push(newMsg)
      }
    )
  }

  public onSendMsgBtnClicked(msg: string) {
    if (msg == "") {
      console.error("empty msg!")
      return;
    }
    this.websocketService.sendMsg(msg, "Andrey");
    this.currentMsg = "";
  }
}
