import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public nombre: string = '';

  constructor(public wsService: WebSocketService) { }

  ngOnInit() {
  }

  ingresar() {
    this.wsService.loginWebsocket( this.nombre );
  }

}
