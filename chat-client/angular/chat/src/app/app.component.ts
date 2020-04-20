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
    this.init();
   }

private init(): void {
  this.websocketService.connect();
  this.websocketService.getLastReceivedMsg().subscribe(
    (newMsg: String) => {
      this.messages.push(newMsg)
    }
  )
}

  public onSendMsgBtnClicked(msg: String) {
    if (msg == "") {
      console.error("empty msg!")
      return;
    }
    this.websocketService.sendMsg(msg);
    this.currentMsg = "";
  }
}
