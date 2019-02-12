import { Injectable } from '@angular/core';
import {  Subject, Observable } from 'rxjs';
import {Message} from '../message/message.model';

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessageService {

  //a steam that publishes new messages only once
  newMessages: Subject<Message> = new Subject<Message>();
  
  // action streams
  create: Subject<Message> = new Subject<Message>();
  
  updates: Subject<any> = new Subject<any>();

  constructor() {
  
    this.create
      .map( function(message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      })
      .subscribe(this.updates);
  
  
    this.newMessages
      .subscribe(this.create);
  
  }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }
}
