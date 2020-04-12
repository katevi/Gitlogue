import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public websocketService: WebsocketService
  ) { }

  ngOnInit() {
  }

  public onConnectBtnClicked() { 
    console.log("Connect btn has been clicked");
  }

}
