import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { Message } from './models/message.model';
import { User } from './models/user.model';

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
  public inputFullName: string = "";
  public inputUsername: string = "";
  public inputPassword: string = "";
  public inputGitHubAccount: string = "";

  constructor(
    public websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  public isLoginPossible(): boolean {
    return (
      (this.inputFullName != "") &&
      (this.inputUsername != "") &&
      (this.inputPassword != "") &&
      (this.inputGitHubAccount != "")
    );
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

  public onLoginBtnClicked() {
    if (!this.isLoginPossible()) {
      return;
    }
    let user = new User(this.inputFullName,
                        this.inputUsername,
                        this.inputPassword,
                        this.inputGitHubAccount);
    this.hasAuthed = this.isLoginPossible();
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
