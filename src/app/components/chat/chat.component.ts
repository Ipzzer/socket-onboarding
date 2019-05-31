import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public texto: string;
  public messageSubscription: Subscription
  public messages: any[] = [];
  private elementHTML: HTMLElement

  constructor(
    private chatService: ChatService) { }

  ngOnInit() {

    this.elementHTML = document.getElementById('chat-mensajes');

    this.messageSubscription = this.chatService.getMessages().subscribe(msg => {
      this.messages.push( msg );
      setTimeout(() => {
        this.elementHTML.scrollTop = this.elementHTML.scrollHeight;
      }, 50);
    });
  }

  enviar() {
    if (this.texto === undefined || this.texto.trim().length === 0) 
      return;
    this.chatService.sendMessage(this.texto);
    // console.log(this.texto);
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

}
