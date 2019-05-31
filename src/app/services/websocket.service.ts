import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public socketStatus = false;
  public usuario: User;

  constructor(private socket: Socket) {
    this.checkStatus();
  }

  /**
   * Verifica conexión con el servidor
   */
  public checkStatus() {

    this.socket.on('connect', () => {
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      this.socketStatus = false;
    });
  }
/**
 * Dispara evento hacia servidor
 * @param event 
 * @param payload 
 * @param callback 
 */
  public emit(event: string, payload?: any, callback?: Function) {
    console.log('Emitiendo mensaje');
    // emit('Evento', payload, callback?)
    this.socket.emit( event, payload, callback );
  }

  /**
   * Escucha cualquier evento
   * @param event 
   */
  public listen (event: string): Observable<any> {
    return this.socket.fromEvent(event);
  }

  public loginWebsocket(nombre: string) {
    console.log('Configurando', nombre);

    this.emit('configurar-usuario', { nombre }, resp => {
      console.log(resp);
    });
  }
}
