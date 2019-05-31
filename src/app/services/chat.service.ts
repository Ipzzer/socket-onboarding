import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsServices: WebSocketService) { }

  public sendMessage(message: string): void {
    const payload: any = {
      message: message
    }
    this.wsServices.emit('message', payload);
  }

  public getMessages(): Observable<any> {
    return this.wsServices.listen('new-message');
  }
}
