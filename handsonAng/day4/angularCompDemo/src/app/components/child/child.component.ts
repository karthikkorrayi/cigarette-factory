import { CommonModule } from '@angular/common';
import { Component ,EventEmitter,Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent implements OnChanges{

  message:string
  @Input() 
  //_loggedin : boolean;

  // // getters
  // get getloggedin(): boolean{
  //   return this._loggedin
  // }

  // //setter
  // @Input()  //decorator where variable receives some input from parent
  // public set setloggedin(value:boolean){
  //   this._loggedin=value;

  //   if(value ===true){
  //     this.message = "hi karthik"
  //   }
  //   else{
  //     this.message="bye karthik"
  //   }
  // }



  loggedIn : boolean;
  ngOnChanges(changes:SimpleChanges):void{
    console.log(changes);

    const loggedValue = changes['loggedIn']
    if(loggedValue.currentValue===true){
      this.message = 'welcome back again'
    }
    else{
      this.message = 'try again bro..'
    }
  }

  name = "karthii"
  propose(){
    alert("love you ra!")
  }



  name2="mowa"
  @Output()  //decorator where variable send to parent
  greetEvent = new EventEmitter() //creating a new event
  callParentGreetFromChild(){
    this.greetEvent.emit(this.name2);

  }
}
