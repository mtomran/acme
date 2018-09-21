import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect();
    this.socket.on("connect", ()=>{
        console.log("Socket: Connected");
    });
    
    this.socket.on("disconnect", ()=>{
        console.log("Socket: Disconnected");
    });    
  }

  // HANDLER
  onEvent(event) {
    return Observable.create(observer => {
      this.socket.on(event, data => {
        observer.next(data);
      });
    });
  }
}
