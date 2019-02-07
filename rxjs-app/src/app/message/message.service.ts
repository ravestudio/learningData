import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import {Message} from '../message/message.model';

@Injectable()
export class MessageService {

  //a steam that publishes new messages only once
  newMessages: Subject<Message> = new Subject<Message>();

  constructor() { }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }
}
