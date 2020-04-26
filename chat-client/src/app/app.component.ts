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

  public selectedFile: File = null;
  imgURL: any = null;


  constructor(
    public websocketService: WebsocketService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.init();
  }

  /**
   * Handles clicking button for avatar choice.
   * @param uploadClicked
   */
  public  onFileChanged(uploadClicked) {
    console.log(uploadClicked);
    this.selectedFile = uploadClicked.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(uploadClicked.target.files[0]);
    reader.onload = (event) => {
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
                        this.inputGitHubAccount);
  
    if (this.selectedFile == null) {
      this.websocketService.registerUser(user);
      return;
    } 
    let avatar = new Avatar(this.selectedFile, 
                            this.selectedFile.name);
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
