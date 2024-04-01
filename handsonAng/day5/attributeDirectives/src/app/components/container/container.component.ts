import { Component } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { BranchesComponent } from '../branches/branches.component';
import { HeaderComponent } from '../header/header.component';
import { NotificationComponent } from '../notification/notification.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [HeaderComponent, BodyComponent, NotificationComponent, SearchComponent, BranchesComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  displayNotification: boolean = false

}
