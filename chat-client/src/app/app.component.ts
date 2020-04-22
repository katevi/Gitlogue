import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { Message } from './models/message.model';
import { User } from './models/user.model';
import { HttpCLient } from '@angular/common/http';

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

  public selectedFile;
  public event1;
  imgUrl : any;
  receivedImageDate : any;
  base64Data : any;
  convertedImage : any;

  constructor(
    public websocketService: WebsocketService,
    private httpClient : HttpClient
  ) { }

  ngOnInit(): void {
    this.init();
  }

  /**
   * Indicates whether login attempt should be allowed.
   */
  public isLoginPossible(): boolean {
    return (
      (this.inputFullName != "") &&
      (this.inputUsername != "") &&
      (this.inputPassword != "") &&
      (this.inputGitHubAccount != "")
    );
  }

  /**
   * Handles login button click.
   */
  public onLoginBtnClicked() {
    if (!this.isLoginPossible()) {
      return;
    }
    let user = new User(this.inputFullName,
      this.inputUsername,
      this.inputPassword,
      this.inputGitHubAccount);
    this.hasAuthed = this.isLoginPossible();
    this.websocketService.registerUser(user);
  }

  /**
   * Handles 'Send' button press.
   * @param msg message to be sent.
   */
  public onSendMsgBtnClicked(msgContent: string) {
    if (msgContent == "") {
      console.error("empty msg!")
      return;
    }
    let msg: Message = new Message(this.inputFullName, msgContent);
    this.websocketService.sendMsg(msg);
    this.currentMsg = "";
  }

  /**
 * Perform component initialization.
 */
  private init(): void {
    this.websocketService.connect();
    // -- Define logic for new message receive
    this.websocketService.getLastReceivedMsg().subscribe(
      (newMsg: Message) => {
        // -- the function is triggered every time ...
        // -- ... new message is received vai STOMP.
        if (newMsg == null) {
          return;
        }
        this.messages.push(newMsg)
      }
    )
  }
}
