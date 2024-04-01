import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMyCustomStyle]',
  standalone: true
})
export class MyCustomStyleDirective {

  constructor(private e: ElementRef) {
    console.log(e);
    e.nativeElement.style.color = " orange";
    
   }

}
