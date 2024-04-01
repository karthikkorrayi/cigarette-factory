import { Component } from '@angular/core';
import { fail } from 'node:assert';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  template: '<div class="alert alert-success" [hidden]="displayNotification"><p>This website uses cookies for better user experience</p></div>',
  //styleUrl: './notification.component.css'

  styles:['.notification-div{margin:10px 0px; padding: 10px 2px; background-color: green; text-align:center;}',
],
})
export class NotificationComponent {
  displayNotification: boolean = false

}
