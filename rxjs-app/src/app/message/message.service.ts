import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import {Message} from '../message/message.model';

const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessageService {

  //a steam that publishes new messages only once
  newMessages: Subject<Message> = new Subject<Message>();

  messages: Observable<Message[]>; 
  
  // action streams
  create: Subject<Message> = new Subject<Message>();
  
  updates: Subject<any> = new Subject<any>();

  constructor() {

    this.messages = this.updates.pipe(
      scan((messages: Message[], operation: IMessagesOperation) => {
        return operation(messages);
      }, initialMessages)
    );
  
    this.create.pipe(
      map( function(message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      }))
      .subscribe(this.updates);
  
  
    this.newMessages
      .subscribe(this.create);
  
  }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }
}
