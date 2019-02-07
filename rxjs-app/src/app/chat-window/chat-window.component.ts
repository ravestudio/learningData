import { Component, Inject, OnInit } from '@angular/core';

import {Observable} from 'rxjs';

import {Message} from '../message/message.model';
import {MessageService} from '../message/message.service'

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  draftMessage: Message;
  constructor(public messageService: MessageService) { }

  ngOnInit() {

    this.draftMessage = new Message();
  }

  onEnter(event:any):void{
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    const m: Message = this.draftMessage;

    this.messageService.addMessage(m);

    this.draftMessage = new Message();
  }

}
