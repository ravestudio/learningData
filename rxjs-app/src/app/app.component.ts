import { Component, inject } from '@angular/core';
import { MessageService } from './message/message.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public messageService: MessageService)
  {

  }

  title = 'rxjs-app';
}
