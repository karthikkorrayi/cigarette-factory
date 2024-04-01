import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChildComponent } from './components/child/child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,ChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularCompDemo';
  userlogin : boolean //= false

  //view child decorator (which is access the any child compo)
  @ViewChild(ChildComponent) childCompo: ChildComponent
  ngAfterViewInit():void{
    this.childCompo.name = 'ayush hacked' //which mean it access and can update any child component vars or func's here..
  }


  //method that child can get here ?? 
  greetMe(val: string){
    alert('understood ah ' + val+'?');
  }
}
