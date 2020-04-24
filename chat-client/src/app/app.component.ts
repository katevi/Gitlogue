import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { Message } from './models/message.model';
import { User } from './models/user.model';
import { HttpClient } from '@angular/common/http';
import { Avatar } from './models/avatar.model';

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

  public selectedFile: File;
  public event1: any;
  imgURL: any;


  constructor(
    public websocketService: WebsocketService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.init();
  }

  public  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
  };

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
      this.inputGitHubAccount,
      null);
    let avatar = new Avatar(this.selectedFile, 
      this.selectedFile.name);
    this.hasAuthed = this.isLoginPossible();
    this.websocketService.registerUser(user, avatar);
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
