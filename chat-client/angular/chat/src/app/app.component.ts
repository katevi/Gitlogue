import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Chat';

  public currentMsg: String = "";
  public messages: String[] = [];

  constructor(
    public websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.websocketService.connect();
    this.websocketService.geStompClient().subscribe("/topic/publishedMessages", function (message) {
      console.log("mrssage bas been received")
    });
}


  onMessageReceived(message) {
    console.log("[component]:: " + JSON.parse(message.body).content);
}

  public onSendMsgBtnClicked(msg: String) {
    if (msg == "") {
      console.error("empty msg!")
      return;
    }
    this.websocketService.sendMsg(msg);
    msg = `${new Date().getTime()} User: ${msg}`
    this.messages.push(msg)
    console.log(`New messages container: ${this.messages}`)
    this.currentMsg = "";
  }
}
